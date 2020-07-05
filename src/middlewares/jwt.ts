import koaJwt from 'koa-jwt';
import { PRIVATE_KEY } from '../share';

const jwtAuth = koaJwt({
  secret: PRIVATE_KEY,
  getToken(ctx) {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    } else if (ctx.query && ctx.query.token) {
      return ctx.query.token;
    }
  }
}).unless({
  path: ['/', '/api/user/login', '/api/user/register']
});

export default jwtAuth;
