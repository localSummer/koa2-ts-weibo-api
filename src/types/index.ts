import log4js from 'log4js';
import { TSuccess, TError } from '../middlewares/response';

export interface IUserInfo {
  id: number;
  userName: string;
  nickName: string;
  picture: string;
  city: string | null;
  gender: number;
}

// 为 Context 类型扩展自定义属性
declare module 'koa' {
  interface DefaultState {
    user: IUserInfo;
  }

  interface DefaultContext {
    success: TSuccess;
    error: TError;
    logger: log4js.Logger;
  }
}

export enum EResponseFlag {
  ERROR,
  SUCCESS
}

export enum EResponseStatus {
  SUCCESS = 200,
  ERROR = 500,
  UN_AUTHORIZED = 401
}

export enum EErrorResponseMsg {
  INVALID_PARAMS = '参数不正确',
  REGISTER_USER_EXISTED = '注册用户已存在',
  REGISTER_USER_NOT_EXIST = '用户名不存在',
  UN_AUTHORIZED = '无权访问',
  USER_NOT_EXISTED = '用户不存在',
  DEFAULT_ERROR = ''
}

export enum EErrorResponseCode {
  DEFAULT_ERROR_CODE = 10000,
  INVALID_PARAMS_CODE = 10001,
  REGISTER_USER_EXISTED_CODE = 10002,
  REGISTER_USER_NOT_EXIST_CODE = 10003,
  UN_AUTHORIZED_CODE = 10004,
  USER_NOT_EXISTED_CODE = 10005,

  DATABASE_ERROR_CODE = 20000
}
