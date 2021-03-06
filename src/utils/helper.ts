import Koa from 'koa';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { PASSWORD_SECRET, PRIVATE_KEY, JWT_EXPIRED, UPLOAD_DIR } from '../share';
import { IUserInfo } from '../types';
import getRedisClient from '../utils/redisClient';

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

  static createToken(data: IUserInfo) {
    return jwt.sign(data, PRIVATE_KEY, {
      expiresIn: JWT_EXPIRED
    });
  }

  static decodeToken(token: string): IUserInfo {
    return jwt.verify(token, PRIVATE_KEY) as IUserInfo;
  }

  static formatPicturePath(path: string) {
    return path.replace(new RegExp(`${UPLOAD_DIR}`), '');
  }

  static redisGet(name: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      getRedisClient().then((redisClient) => {
        redisClient.get(name, (err, value) => {
          if (err) {
            return reject(err);
          }
          return resolve(value);
        });
      });
    });
  }

  static redisSet(name: string, value: string, expired: number) {
    return new Promise((resolve) => {
      getRedisClient().then((redisClient) => {
        redisClient.set(name, value);
        redisClient.expire(name, expired);
        resolve(true);
      });
    });
  }

  static redisExpire(name: string, expired: number) {
    return new Promise((resolve) => {
      getRedisClient().then((redisClient) => {
        redisClient.expire(name, expired);
        resolve(true);
      });
    });
  }
}

export default Helper;
