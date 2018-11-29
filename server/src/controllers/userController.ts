import * as Joi from 'joi';
import db from '../db';
import {encryptPassword} from "../utils/utils";

export async function register(ctx, next) {
    const validateSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required().required(),
        password: Joi.string().length(8).required(),
        verifyCode: Joi.string().required(),
    });
    const { error } = Joi.validate(ctx.body, validateSchema);
    if (error) {
        ctx.throw(400, '参数错误')
    }
    const { email, name } = ctx.body;

    try {
        const existUser = await db.select().from('user').where('email', email).orWhere('name', name);
        if (existUser) {
            ctx.throw(400, '邮箱或用户名重复');
        }

        const existVerifyCode await db.select().from('verify_code').where({
           email,
           verifyCode,
        });

        const password = encryptPassword(ctx.body.password);
        await db('user').insert({
           email,
           name,
           password,
        });
        ctx.body = { message: '注册成功' };
    }

    next();
}
