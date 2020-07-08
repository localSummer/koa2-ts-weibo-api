import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import upload from '../middlewares/upload';
import tokenCheck from '../middlewares/tokenCheck';
import UtilController from '../controllers/utilController';

const router = new Router<DefaultState, Context>();

router.post('/upload', tokenCheck, upload().single('file'), UtilController.uploadAvator);

export default router;
