import * as Router from 'koa-router';

import * as userControllers from './controllers/userController';

const router = new Router();

router.post('/api/register', userControllers.register);

export default router;
