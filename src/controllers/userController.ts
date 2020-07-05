import Koa from 'koa';
import UserService from '../services/userService';
import * as Types from '../types';
import Helper from '../utils/helper';

class UserController {
  static async uploadAvator(ctx: Koa.Context) {
    ctx.logger.warn(ctx.file);
    ctx.logger.warn(ctx.request.body);
    ctx.success('上传成功');
  }

  static async isExist(ctx: Koa.Context) {
    const { userName } = ctx.request.body;
    const userInfo = await UserService.getUserInfo(userName);
    if (userInfo) {
      ctx.success(userInfo);
    } else {
      ctx.error(
        Types.EErrorResponseCode.REGISTER_USER_NOT_EXIST_CODE,
        Types.EErrorResponseMsg.REGISTER_USER_NOT_EXIST
      );
    }
  }

  static async login(ctx: Koa.Context) {
    const { userName, password } = ctx.request.body;
    const user = await UserService.getUserInfo(userName, Helper.encrypt(password));
    if (!user) {
      return ctx.error(
        Types.EErrorResponseCode.USER_NOT_EXISTED_CODE,
        Types.EErrorResponseMsg.USER_NOT_EXISTED
      );
    }

    ctx.success({
      token: Helper.getToken({
        id: user.id,
        userName: user.userName,
        nickName: user.nickName,
        picture: user.picture,
        city: user.city,
        gender: user.gender
      })
    });
  }

  static async register(ctx: Koa.Context) {
    const { userName, password, gender = 3 } = ctx.request.body;

    const userInfo = await UserService.getUserInfo(userName);
    if (userInfo) {
      return ctx.error(
        Types.EErrorResponseCode.REGISTER_USER_EXISTED_CODE,
        Types.EErrorResponseMsg.REGISTER_USER_EXISTED
      );
    }

    try {
      const user = await UserService.createUser({
        userName,
        password: Helper.encrypt(password),
        gender
      });
      ctx.success({
        token: Helper.getToken({
          id: user.id,
          userName: user.userName,
          nickName: user.nickName,
          picture: user.picture,
          city: user.city,
          gender: user.gender
        })
      });
    } catch (error) {
      ctx.error(Types.EErrorResponseCode.DATABASE_ERROR_CODE, error.message, error.stack);
    }
  }

  static async delete(ctx: Koa.Context) {
    const { userName } = ctx.state.user;
    try {
      await UserService.deleteUser(userName);
      ctx.success();
    } catch (error) {
      ctx.error(Types.EErrorResponseCode.DATABASE_ERROR_CODE, error.message, error.stack);
    }
  }
}

export default UserController;
