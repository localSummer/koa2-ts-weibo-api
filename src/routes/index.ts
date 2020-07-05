import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import userRouter from './user';
import utilRouter from './util';

const router = new Router<DefaultState, Context>();

router.get('/', async (ctx: Context) => {
  ctx.success('test connection');
});

// 需要为 Router 添加类型声明，否则可能会报出 ctx 类型不匹配问题
router.use('/api/user', userRouter.routes(), userRouter.allowedMethods());

router.use('/api/util', utilRouter.routes(), utilRouter.allowedMethods());

export default router;
