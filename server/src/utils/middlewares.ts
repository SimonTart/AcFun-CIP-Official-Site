import db from '../db';

export async function requireLogin(ctx, next) {
    if (!ctx.session.userId) {
        ctx.throw(403, '无权限访问');
    }
    await next();
}

export async function appendUser(ctx, next) {
    if (ctx.session.userId) {
        const user = await db.select().from('user')
            .where('id', ctx.session.userId)
            .first();
        if (user) {
            ctx.state.user = user;
        } else {
            ctx.session.userId = null;
        }
    }
    await next();
}