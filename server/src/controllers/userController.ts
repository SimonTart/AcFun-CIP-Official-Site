import * as Joi from 'joi';
import db from '../db';
import {encryptPassword} from '../utils/utils';
import { VERIFY_CODE_TYPES } from '../common/constant';

export async function register(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required().required(),
        password: Joi.string().length(8).required(),
        verifyCode: Joi.string().required(),
    }).required();
    const { error: validatorError } = Joi.validate(ctx.body, validatorSchema);
    if (validatorError) {
        ctx.throw(400, '参数错误')
    }
    const { email, name, verifyCode } = ctx.body;

    try {
        const existUser = await db.select().from('user').where('email', email).orWhere('name', name);
        if (existUser) {
            ctx.throw(400, '邮箱或用户名重复');
        }

        const existVerifyCode = await db.select().from('verify_code').where({
           email,
           verifyCode,
            type: VERIFY_CODE_TYPES.REGISTER,
        });

        if (!existVerifyCode) {
            ctx.throw(400, '验证码错误');
        }

        const password = encryptPassword(ctx.body.password);
        await db('user').insert({
           email,
           name,
           password,
        });
        ctx.body = { message: '注册成功' };
    } catch (e) {
        throw e;
    }

    next();
}
