import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import AtMeController from '../controllers/atMeController';

const router = new Router<DefaultState, Context>();

router.get('/getAtMeCount', tokenCheck, AtMeController.getAtMeCount);

router.get('/loadMore/:pageIndex', tokenCheck, AtMeController.getAtMeBlogList);

router.get('/markAsRead', tokenCheck, AtMeController.markAsRead);

export default router;
