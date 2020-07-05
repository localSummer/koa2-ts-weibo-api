import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import upload from '../middlewares/upload';
import UtilController from '../controllers/utilController';

const router = new Router<DefaultState, Context>();

router.post('/upload', upload().single('file'), UtilController.uploadAvator);

export default router;
