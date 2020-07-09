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
  UN_AUTHORIZED = 401,
  SYSTEM_ERROR = 500
}

export enum EErrorResponseMsg {
  INVALID_PARAMS = '参数不正确',
  USER_EXISTED = '用户已存在',
  USER_NOT_EXIST = '用户名不存在',
  UN_AUTHORIZED = '无权访问',
  USER_NOT_EXISTED = '用户不存在',
  SYSTEM_ERROR_CODE = '系统异常',
  PICTURE_UPDATE_ERROR = '头像更新失败',
  UPDATA_USER_ERROR = '用户信息更新失败',
  PASSWORD_RESET_ERROR = '密码重置失败',
  CREATE_BLOG_ERROR = '微博创建失败',
  FILE_UPLOAD_ERROR = '文件上传失败',
  DEFAULT_ERROR = ''
}

export enum EErrorResponseCode {
  DEFAULT_ERROR_CODE = 10000,
  INVALID_PARAMS_CODE = 10001,
  USER_EXISTED_CODE = 10002,
  USER_NOT_EXIST_CODE = 10003,
  UN_AUTHORIZED_CODE = 10004,
  USER_NOT_EXISTED_CODE = 10005,
  SYSTEM_ERROR_CODE = 10006,
  PICTURE_UPDATE_ERROR_CODE = 10007,
  UPDATA_USER_ERROR_CODE = 10008,
  PASSWORD_RESET_ERROR_CODE = 10009,
  CREATE_BLOG_ERROR_CODE = 10010,
  FILE_UPLOAD_ERROR_CODE = 10011,

  DATABASE_ERROR_CODE = 20000
}
