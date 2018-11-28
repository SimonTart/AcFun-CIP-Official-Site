import * as Joi from 'joi';

export async function register(ctx, next) {
    const validateSchema = Joi.object().keys({
        email: Joi.string().email(),
        name: Joi.string().required(),
        password: Joi.string().length(8),
    });
    const { error } = Joi.validate(ctx.body, validateSchema);
    if (error) {
        ctx.throw(403, '参数错误')
    }
    ctx.body = 'register';
    next();
}
