import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import UserController from '../controllers/userController';
import upload from '../middlewares/upload';
import Validator from '../middlewares/validator';
import rules from '../rules';

// 需要为 Router 添加类型声明，否则 router.post('/delete', UserController.delete); 该接口会报出 ctx 类型不匹配问题
const router = new Router<DefaultState, Context>();

router.post('/isExist', Validator.validator(rules.userModel), UserController.isExist);

router.post('/login', Validator.validator(rules.loginModel), UserController.login);

router.post('/register', Validator.validator(rules.registModel), UserController.register);

router.post('/delete', UserController.delete);

router.post('/upload', upload().single('file'), UserController.uploadAvator);

export default router;
