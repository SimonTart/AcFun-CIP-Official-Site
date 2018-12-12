import * as Router from 'koa-router';

import * as userControllers from './controllers/userController';
import * as verifyCodeControllers from './controllers/verifyCodeController';
import {requireLogin} from './utils/middlewares';

const router = new Router();

router.post('/api/user/register', userControllers.register);
router.post('/api/user/login', userControllers.login);
router.post('/api/user/forget-password', userControllers.forgetPassword);
router.post('/api/user/modify-password', requireLogin, userControllers.modifyPassword);
router.post('/api/user/verify-email', userControllers.verifyEmail);
router.post('/api/user/verify-name', userControllers.verifyName);
router.get('/api/user/account', userControllers.account);
router.post('/api/verify-code/register', verifyCodeControllers.sendRegisterVerifyCode);
router.post('/api/verify-code/forget-password', verifyCodeControllers.sendForgetPasswordVerifyCode);

export default router;
