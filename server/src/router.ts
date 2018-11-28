import * as Router from 'koa-router';

const router = new Router();

router.get('/*', async function (ctx) {
    if (ctx.path === '/favicon.ico') return;

    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = ' views';
});


export default router;
