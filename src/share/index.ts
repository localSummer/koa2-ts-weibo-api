export const PASSWORD_SECRET = 'summer@winter';

export const PRIVATE_KEY = 'summer@winter';

export const JWT_EXPIRED = 60 * 60 * 24; // 过期时间24小时

export const BASE_URL = 'http://127.0.0.1:3001';

export const UPLOAD_DIR = 'uploads';

export const redisConfig = {
  host: '127.0.0.1',
  port: 6379
};

export const REDIS_PREFIX = 'koa:token:';

export const REDIS_BLOGS = 'koa:blogs:';

export const REDIS_SQUARE = 'koa:square:';

export const REDIS_BLOGS_EXPIRED = 60;

export const PAGE_SIZE = 5;

// 正则表达式，匹配 '@昵称 - userName'
export const REG_FOR_AT_WHO = /@(.+?)\s-\s(\w+?)\b/g;
