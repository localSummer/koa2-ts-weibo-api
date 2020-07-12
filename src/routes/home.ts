import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import HomeController from '../controllers/homeController';

const router = new Router<DefaultState, Context>();

router.get('/loadMore/:pageIndex', tokenCheck, HomeController.getHomeBlogList);

export default router;
