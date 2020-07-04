import Router from 'koa-router';
import UserController from '../controllers/userController';
import upload from '../middlewares/upload';
import Validator from '../middlewares/validator';

const router = new Router();

router.post('/register', Validator.validRegist, UserController.register);

router.post('/upload', upload().single('file'), UserController.uploadAvator);

export default router;
