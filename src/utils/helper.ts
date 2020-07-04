import Koa from 'koa';
import crypto from 'crypto';
import { PASSWORD_SECRET } from '../share';

class Helper {
  static logFormat(ctx: Koa.Context, ms: number) {
    return `method:${ctx.method} path:${ctx.url} agent:${
      ctx.req.headers['user-agent']
    } request:${JSON.stringify(ctx.request.body)} duration:${ms}ms response:${JSON.stringify(
      ctx.response.body
    )}`;
  }

  static formatDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
    return year + '-' + month + '-' + day;
  }

  static encrypt(password: string) {
    return crypto
      .createHmac('md5', PASSWORD_SECRET)
      .update(password)
      .digest('hex');
  }
}

export default Helper;
