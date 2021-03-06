import Koa from 'koa';
import UserService from '../services/userService';
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
    if (ctx.file) {
      const path = Helper.formatPicturePath(ctx.file.path);
      ctx.success(path);
    } else {
      ctx.error(
        Types.EErrorResponseCode.FILE_UPLOAD_ERROR_CODE,
        Types.EErrorResponseMsg.FILE_UPLOAD_ERROR
      );
    }
  }
}

export default UtilController;
