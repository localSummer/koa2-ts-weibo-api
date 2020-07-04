import Router from 'koa-router';
import userRouter from './user';

const router = new Router();

router.use('/api/user', userRouter.routes(), userRouter.allowedMethods());

export default router;
