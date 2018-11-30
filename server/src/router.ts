import * as Router from 'koa-router';

import * as userControllers from './controllers/userController';
import * as verifyCodeControllers from './controllers/verifyCodeController';

const router = new Router();

router.post('/api/register', userControllers.register);
router.post('/api/verify-code/register', verifyCodeControllers.sendRegisterVerifyCode);
router.post('/api/verify-code/forget-password', verifyCodeControllers.sendForgetPasswordVerifyCode);

export default router;
