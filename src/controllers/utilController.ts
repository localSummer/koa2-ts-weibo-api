import Koa from 'koa';
import UserService from '../services/userService';
import UtilService from '../services/utilService';
import * as Types from '../types';
import Helper from '../utils/helper';

class UtilController {
  static async uploadAvator(ctx: Koa.Context) {
    // ctx.logger.warn(ctx.file);
    // ctx.logger.warn(ctx.request.body);
    const { userName } = ctx.state.user;
    const userInfo = await UserService.getUserInfo(userName);
    if (!userInfo) {
      return ctx.error(
        Types.EErrorResponseCode.USER_NOT_EXISTED_CODE,
        Types.EErrorResponseMsg.USER_NOT_EXISTED
      );
    }
    const path = Helper.formatPicturePath(ctx.file.path);
    try {
      await UtilService.updateAvator(userName, path);
      ctx.success(path);
    } catch (error) {
      ctx.error(
        Types.EErrorResponseCode.DATABASE_ERROR_CODE,
        error.message,
        error.stack,
        Types.EResponseStatus.SYSTEM_ERROR
      );
    }
  }
}

export default UtilController;
