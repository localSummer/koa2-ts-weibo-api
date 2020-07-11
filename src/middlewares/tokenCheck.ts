import Koa from 'koa';
import { REDIS_PREFIX } from '../share';
import * as Types from '../types';
import Helper from '../utils/helper';

const tokenCheck = async (ctx: Koa.Context, next: Koa.Next) => {
  const { userName } = ctx.state.user;

  try {
    const token = await Helper.redisGet(`${REDIS_PREFIX}${userName}`);
    if (token) {
      return await next();
    } else {
      return ctx.error(
        Types.EErrorResponseCode.UN_AUTHORIZED_CODE,
        Types.EErrorResponseMsg.UN_AUTHORIZED,
        null,
        Types.EResponseStatus.UN_AUTHORIZED
      );
    }
  } catch (error) {
    return ctx.error(
      Types.EErrorResponseCode.DATABASE_ERROR_CODE,
      error.message,
      error.stack,
      Types.EResponseStatus.SYSTEM_ERROR
    );
  }
};

export default tokenCheck;
