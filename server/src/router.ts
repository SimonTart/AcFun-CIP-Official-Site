import * as Router from 'koa-router';

const router = new Router();

router.get('/*', async function (ctx) {
    ctx.session.isNew = true;
    ctx.body = 'hello world';
});


export default router;
