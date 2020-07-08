import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import UserController from '../controllers/userController';
import Validator from '../middlewares/validator';
import tokenCheck from '../middlewares/tokenCheck';
import rules from '../rules';

// 需要为 Router 添加类型声明，否则 router.post('/delete', UserController.delete); 该接口会报出 ctx 类型不匹配问题
const router = new Router<DefaultState, Context>();

router.get('/getUserInfo', tokenCheck, UserController.getUserInfo);

router.post('/isExist', Validator.validator(rules.userModel), UserController.isExist);

router.post('/login', Validator.validator(rules.loginModel), UserController.login);

router.post('/register', Validator.validator(rules.registModel), UserController.register);

router.post('/delete', tokenCheck, Validator.validator(rules.userModel), UserController.delete);

router.get('/logout', tokenCheck, UserController.logout);

router.patch(
  '/updateUserInfo',
  Validator.validator(rules.updateUserModel),
  UserController.updateUser
);

router.patch(
  '/resetPassword',
  Validator.validator(rules.resetPwdModel),
  UserController.resetPassword
);

export default router;
