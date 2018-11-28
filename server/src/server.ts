import * as koa from 'koa';
import * as koaBody from 'koa-body';
import * as session from 'koa-session';
import * as koaSessopnStore from 'koa-session-knex-store';

import router from './router';
import db from './db';

const app = new koa();
app.keys = ['some secret hurr'];
const store = koaSessopnStore(db, { createtable: true });

app.use(session({
    key: 'acfun', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 30*24*60*60,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    store: store,
}, app));
app.use(koaBody());
app.use(router.routes());

app.listen(4100);
console.log('Server running on port 4100');


