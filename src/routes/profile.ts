import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import ProfileController from '../controllers/profileController';

const router = new Router<DefaultState, Context>();

router.get('/:userName', tokenCheck, ProfileController.getProfileUserInfo);

router.get('/loadMore/:userName/:pageIndex', tokenCheck, ProfileController.getProfileBlogList);

export default router;
