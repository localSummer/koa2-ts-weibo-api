import Koa from 'koa';
import UserService from '../services/userService';
import * as Types from '../types';
import Helper from '../utils/helper';
import { REDIS_PREFIX, JWT_EXPIRED } from '../share';

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
        Types.EErrorResponseCode.USER_NOT_EXIST_CODE,
        Types.EErrorResponseMsg.USER_NOT_EXIST
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
    const token = Helper.createToken({
      id: user.id,
      userName: user.userName,
      nickName: user.nickName,
      picture: user.picture,
      city: user.city,
      gender: user.gender
    });
    const redisKey = `${REDIS_PREFIX}${user.userName}`;
    await Helper.redisSet(redisKey, token, JWT_EXPIRED);
    ctx.success({
      token
    });
  }

  static async register(ctx: Koa.Context) {
    const { userName, password, gender = 3 } = ctx.request.body;

    const userInfo = await UserService.getUserInfo(userName);
    if (userInfo) {
      return ctx.error(
        Types.EErrorResponseCode.USER_EXISTED_CODE,
        Types.EErrorResponseMsg.USER_EXISTED
      );
    }

    const user = await UserService.createUser({
      userName,
      password: Helper.encrypt(password),
      gender
    });
    const token = Helper.createToken({
      id: user.id,
      userName: user.userName,
      nickName: user.nickName,
      picture: user.picture,
      city: user.city,
      gender: user.gender
    });
    const redisKey = `${REDIS_PREFIX}${user.userName}`;
    await Helper.redisSet(redisKey, token, JWT_EXPIRED);
    ctx.success({
      token
    });
  }

  static async delete(ctx: Koa.Context) {
    const { userName } = ctx.state.user;
    if (userName !== ctx.request.body.userName) {
      return ctx.error(
        Types.EErrorResponseCode.UN_AUTHORIZED_CODE,
        Types.EErrorResponseMsg.UN_AUTHORIZED
      );
    }
    await UserService.deleteUser(userName);
    ctx.success();
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
      Helper.redisExpire(`${REDIS_PREFIX}${userName}`, 0);
      ctx.success();
    } else {
      ctx.error(
        Types.EErrorResponseCode.PASSWORD_RESET_ERROR_CODE,
        Types.EErrorResponseMsg.PASSWORD_RESET_ERROR
      );
    }
  }

  static async logout(ctx: Koa.Context) {
    const { userName } = ctx.state.user;
    Helper.redisExpire(`${REDIS_PREFIX}${userName}`, 0);
    ctx.success();
  }
}

export default UserController;
