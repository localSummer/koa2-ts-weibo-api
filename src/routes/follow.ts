import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import FollowController from '../controllers/followController';

const router = new Router<DefaultState, Context>();

router.post('/addFollow', tokenCheck, FollowController.addFollower);

router.post('/deleteFollow', tokenCheck, FollowController.deletefollow);

router.post('/getFans', tokenCheck, FollowController.getFans);

router.post('/getFollowers', tokenCheck, FollowController.getFollowers);

export default router;
