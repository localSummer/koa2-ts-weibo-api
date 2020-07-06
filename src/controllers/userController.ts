import Koa from 'koa';
import UserService from '../services/userService';
import * as Types from '../types';
import Helper from '../utils/helper';

class UserController {
  static async getUserInfo(ctx: Koa.Context) {
    const { userName } = ctx.state.user;
    const userInfo = await UserService.getUserInfo(userName);
    if (userInfo) {
      ctx.success(userInfo);
    } else {
      ctx.error(
        Types.EErrorResponseCode.USER_NOT_EXISTED_CODE,
        Types.EErrorResponseMsg.USER_NOT_EXISTED
      );
    }
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
    if (userName !== ctx.request.body.userName) {
      return ctx.error(
        Types.EErrorResponseCode.UN_AUTHORIZED_CODE,
        Types.EErrorResponseMsg.UN_AUTHORIZED
      );
    }
    try {
      await UserService.deleteUser(userName);
      ctx.success();
    } catch (error) {
      ctx.error(
        Types.EErrorResponseCode.DATABASE_ERROR_CODE,
        error.message,
        error.stack,
        Types.EResponseStatus.SYSTEM_ERROR
      );
    }
  }

  static async updateUser(ctx: Koa.Context) {
    const { userName } = ctx.state.user;
    const { nickName, picture, city } = ctx.request.body;
    const userInfo = await UserService.getUserInfo(userName);
    if (!userInfo) {
      return ctx.error(
        Types.EErrorResponseCode.USER_NOT_EXISTED_CODE,
        Types.EErrorResponseMsg.USER_NOT_EXISTED
      );
    }
    const result = await UserService.updateUser(userName, {
      nickName,
      picture,
      city
    });

    if (result) {
      ctx.success();
    } else {
      ctx.error(
        Types.EErrorResponseCode.UPDATA_USER_ERROR_CODE,
        Types.EErrorResponseMsg.UPDATA_USER_ERROR
      );
    }
  }

  static async resetPassword(ctx: Koa.Context) {
    const { userName } = ctx.state.user;
    const { oldPassword, password } = ctx.request.body;
    const userInfo = await UserService.getUserInfo(userName, Helper.encrypt(oldPassword));
    if (!userInfo) {
      return ctx.error(
        Types.EErrorResponseCode.USER_NOT_EXISTED_CODE,
        Types.EErrorResponseMsg.USER_NOT_EXISTED
      );
    }
    const result = await UserService.resetPassword(
      userName,
      Helper.encrypt(oldPassword),
      Helper.encrypt(password)
    );
    if (result) {
      ctx.success();
    } else {
      ctx.error(
        Types.EErrorResponseCode.PASSWORD_RESET_ERROR_CODE,
        Types.EErrorResponseMsg.PASSWORD_RESET_ERROR
      );
    }
  }
}

export default UserController;
