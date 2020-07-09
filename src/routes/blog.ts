import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import tokenCheck from '../middlewares/tokenCheck';
import BlogController from '../controllers/blogController';
import Validator from '../middlewares/validator';
import rules from '../rules';

const router = new Router<DefaultState, Context>();

router.post('/create', tokenCheck, Validator.validator(rules.blogModel), BlogController.createBlog);

export default router;
