import * as koa from 'koa';
import * as koaBody from 'koa-body';
import * as session from 'koa-session';
import * as koaJson from 'koa-json';
import * as koaLogger from 'koa-logger';
import * as koaSessionStore from 'koa-session-knex-store';

import router from './router';
import db from './db';

const app = new koa();


const store = koaSessionStore(db, {createtable: true});


app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (e.status) {
            ctx.status = e.status;
            ctx.body = {message: e.message};
        } else {
            ctx.status = 500;
            ctx.body = {message: '服务器错误'};
        }
    }
});

app.use(koaLogger());

app.keys = ['acfun-cip-os'];
app.use(session({
    key: 'cip_id', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 30 * 24 * 60 * 60,
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: true,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    store: store,
}, app));

app.use(koaJson());
app.use(koaBody());

app.use(router.routes());

app.on('error', (err, ctx) => {
    console.error(err);
});

app.listen(4100);
console.log('Server running on port 4100');


