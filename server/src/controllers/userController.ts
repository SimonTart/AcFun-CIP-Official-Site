import * as Joi from 'joi';
import db from '../db';
import {encryptPassword} from '../utils/utils';
import {VERIFY_CODE_TYPES} from '../common/constant';
import * as dayjs from 'dayjs';

// 用户注册
export async function register(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required().required(),
        password: Joi.string().min(8).required(),
        verifyCode: Joi.string().required(),
    }).required();
    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});
    if (validatorError) {
        ctx.throw(400, '参数错误')
    }
    const {email, name, verifyCode} = ctx.request.body;

    try {
        const existUser = await db.select().from('user').where('email', email).orWhere('name', name).first();
        if (existUser) {
            ctx.throw(400, '邮箱或用户名重复');
        }

        const existVerifyCode = await db.select().first()
            .from('verify_code')
            .where({
                email,
                code: verifyCode,
                type: VERIFY_CODE_TYPES.REGISTER,
            })
            .andWhere('created_at', '>', dayjs().startOf('day').format('YYYY-MM-DD HH:MM:SS'));

        if (!existVerifyCode) {
            ctx.throw(400, '验证码错误');
        }

        const password = encryptPassword(ctx.request.body.password);
        await db.transaction((trx) => {
            return trx('user').insert({
                email,
                name,
                password,
            })
            .then(() => {
                return trx('verify_code').update({ is_used: true }).where({ id: existVerifyCode.id });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })

        ctx.body = {message: '注册成功'};
    } catch (e) {
        throw e;
    }

    next();
}


// 验证邮箱是否已经注册
export async function verifyEmail(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
    }).required();

    const { error: validatorError } = Joi.validate(ctx.request.body, validatorSchema, { allowUnknown: true });

    if (validatorError) {
        ctx.throw(400, '参数错误');
    }
    const { email } = ctx.request.body;
    const existEmail = await db.select().from('user').where({ email });

    if (existEmail) {
        ctx.body = {
            registered: true,
            message: '该邮箱已注册',
        };
    } else {
        ctx.body = {
            registered: false,
            message: '该邮箱未注册',
        };
    }

    next();
}

// 验证用户名是否已经使用
export async function verifyName(ctx, next) {
    const validatorSchema = Joi.object().keys({
        name: Joi.string().required(),
    }).required();

    const { error: validatorError } = Joi.validate(ctx.request.body, validatorSchema, { allowUnknown: true });

    if (validatorError) {
        ctx.throw(400, '参数错误');
    }
    const { name } = ctx.request.body;
    const existName = await db.select().from('user').where({ name });

    if (existName) {
        ctx.body = {
            used: true,
            message: '该用户名已使用',
        };
    } else {
        ctx.body = {
            used: false,
            message: '该用户名未使用',
        };
    }

    next();
}
