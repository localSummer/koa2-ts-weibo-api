import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import SquareController from '../controllers/squareController';

const router = new Router<DefaultState, Context>();

router.get('/loadMore/:pageIndex', tokenCheck, SquareController.getSquareBlogList);

export default router;
