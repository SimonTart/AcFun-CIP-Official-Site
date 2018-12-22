import * as koa from 'koa';
import * as koaBody from 'koa-body';
import * as session from 'koa-session';
import * as koaJson from 'koa-json';
import * as koaLogger from 'koa-logger';
import * as koaSessionStore from 'koa-session-knex-store';
import * as serve from 'koa-static';
import * as path from 'path';
import * as render from 'koa-ejs';


import router from './router';
import osDb from './osDb';
import {appendUser} from './utils/middlewares';
import {STATUS_CODES} from '../../common/constant';

const app = new koa();


const store = koaSessionStore(osDb, {createtable: true});


app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.error(e);
        if (e.statusCode) {
            ctx.body = {
                statusCode: e.statusCode,
                message: e.message
            };
        } else {
            ctx.body = {
                statusCode: STATUS_CODES.INTERNAL_ERROR,
                message: '服务器错误'
            };
        }
    }
});

render(app, {
    root: path.join(__dirname, 'public'),
    layout: false,
    viewExt: 'html',
});
app.use(koaLogger());
app.use(serve(path.resolve(__dirname, 'public'), {maxAge: 365 * 24 * 60 * 60}))

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

app.use(appendUser);
app.use(koaJson());
app.use(koaBody());

app.use(router.routes());

app.on('error', (err) => {
    console.error(err);
});

app.listen(4100);
console.log('Server running on port 4100');


