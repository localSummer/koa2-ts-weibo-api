import Router from 'koa-router';
import UserController from '../controllers/userController';
import upload from '../middlewares/upload';
import Validator from '../middlewares/validator';
import rules from '../rules';
import { DefaultState, Context } from 'koa';

// 需要为 Router 添加类型声明，否则 router.post('/delete', UserController.delete); 该接口会报出 ctx 类型不匹配问题
const router = new Router<DefaultState, Context>();

router.post('/isExist', Validator.validator(rules.userModel), UserController.isExist);

router.post('/register', Validator.validator(rules.registModel), UserController.register);

router.post('/delete', UserController.delete);

router.post('/upload', upload().single('file'), UserController.uploadAvator);

export default router;
