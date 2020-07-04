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
      await UserService.createUser({
        userName,
        password: Helper.encrypt(password),
        gender
      });
      ctx.success();
    } catch (error) {
      ctx.error(Types.EErrorResponseCode.DATABASE_ERROR_CODE, error.message, error.stack);
    }
  }
}

export default UserController;
