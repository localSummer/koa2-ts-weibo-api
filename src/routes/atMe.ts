import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import AtMeController from '../controllers/atMeController';
import Validator from '../middlewares/validator';
import rules from '../rules';

const router = new Router<DefaultState, Context>();

router.get('/getAtMeCount', tokenCheck, AtMeController.getAtMeCount);

router.get('/loadMore/:pageIndex', tokenCheck, AtMeController.getAtMeBlogList);

router.get('/markAllAsRead', tokenCheck, AtMeController.markAllAsRead);

router.post(
  '/markAsReadByBlogId',
  tokenCheck,
  Validator.validator(rules.blogIdModel),
  AtMeController.markAsReadByBlogId
);

export default router;
