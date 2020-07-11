import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import FollowController from '../controllers/followController';
import Validator from '../middlewares/validator';
import rules from '../rules';

const router = new Router<DefaultState, Context>();

router.post(
  '/addFollow',
  tokenCheck,
  Validator.validator(rules.followerIdModel),
  FollowController.addFollower
);

router.post(
  '/deleteFollow',
  tokenCheck,
  Validator.validator(rules.followerIdModel),
  FollowController.deletefollow
);

router.post(
  '/getFans',
  tokenCheck,
  Validator.validator(rules.followerIdModel),
  FollowController.getFans
);

router.post(
  '/getFollowers',
  tokenCheck,
  Validator.validator(rules.userIdModel),
  FollowController.getFollowers
);

router.get('/followInfo', tokenCheck, FollowController.getFollowInfo);

export default router;
