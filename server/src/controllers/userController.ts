import * as Joi from 'joi';
import osDb from '../osDb';
import {encryptPassword} from '../utils/utils';
import {VERIFY_CODE_TYPES} from '../common/constant';
import * as dayjs from 'dayjs';
import {BadRequestError, RequireLoginError} from '../common/errors';
import {STATUS_CODES} from '../common/constant';

// 用户注册
export async function register(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().min(8).required(),
        verifyCode: Joi.string().required(),
    }).required();
    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});
    if (validatorError) {
        throw new BadRequestError();
    }
    const {email, name, verifyCode} = ctx.request.body;

    const existUser = await osDb.select().from('user').where('email', email).orWhere('name', name).first();
    if (existUser) {
        throw new BadRequestError('邮箱或用户名重复');
    }

    const existVerifyCode = await osDb.select().first()
        .from('verify_code')
        .where({
            email,
            code: verifyCode,
            type: VERIFY_CODE_TYPES.REGISTER,
            is_used: false,
        })
        .andWhere('created_at', '>', dayjs().startOf('day').format('YYYY-MM-DD HH:MM:SS'));

    if (!existVerifyCode) {
        throw new BadRequestError('验证码错误');
    }

    const password = encryptPassword(ctx.request.body.password);
    await osDb.transaction((trx) => {
        return trx('user').insert({
            email,
            name,
            password,
        })
            .then(() => {
                return trx('verify_code').update({is_used: true}).where({id: existVerifyCode.id});
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })

    ctx.body = {
        statusCode: STATUS_CODES.SUCCESS,
        message: '注册成功'
    };
}

export async function login(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).required();

    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});
    if (validatorError) {
        throw new BadRequestError();
    }

    const {email} = ctx.request.body;
    const password = encryptPassword(ctx.request.body.password);
    const user = await osDb.select().from('user').where({
        email,
        password,
    }).first();

    if (!user) {
        throw new BadRequestError('邮箱或密码错误');
    } else {
        ctx.session.userId = user.id;
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            message: '登录成功'
        };
    }
}


// 验证邮箱是否已经注册
export async function verifyEmail(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
    }).required();

    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});

    if (validatorError) {
        throw new BadRequestError();
    }
    const {email} = ctx.request.body;
    const existEmail = await osDb.select().from('user').where({email}).first();

    if (existEmail) {
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            registered: true,
            message: '该邮箱已注册',
        };
    } else {
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            registered: false,
            message: '该邮箱未注册',
        };
    }
}

// 验证用户名是否已经使用
export async function verifyName(ctx, next) {
    const validatorSchema = Joi.object().keys({
        name: Joi.string().required(),
    }).required();

    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});

    if (validatorError) {
        throw new BadRequestError();
    }
    const {name} = ctx.request.body;
    const existName = await osDb.select().from('user').where({name}).first();

    if (existName) {
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            used: true,
            message: '该用户名已使用',
        };
    } else {
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            used: false,
            message: '该用户名未使用',
        };
    }
}


// 用户重置密码
export async function forgetPassword(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        verifyCode: Joi.string().required(),
    }).required();
    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});
    if (validatorError) {
        throw new BadRequestError();
    }
    const {email, name, verifyCode} = ctx.request.body;

    const existUser = await osDb.select().from('user').where('email', email).first();
    if (!existUser) {
        throw new BadRequestError('该邮箱未注册');
    }

    const existVerifyCode = await osDb.select().first()
        .from('verify_code')
        .where({
            email,
            code: verifyCode,
            type: VERIFY_CODE_TYPES.FORGET_PASSWORD,
            is_used: false,
        })
        .andWhere('created_at', '>', dayjs().startOf('day').format('YYYY-MM-DD HH:MM:SS'));

    if (!existVerifyCode) {
        throw new BadRequestError('验证码错误');
    }

    const password = encryptPassword(ctx.request.body.password);
    await osDb.transaction((trx) => {
        return trx('user').update({
            password,
        })
            .where({email})
            .then(() => {
                return trx('verify_code').update({is_used: true}).where({id: existVerifyCode.id});
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })

    ctx.body = {
        statusCode: STATUS_CODES.SUCCESS,
        message: '密码修改成功'
    };
}

// 用户修改密码
export async function modifyPassword(ctx, next) {
    const validatorSchema = Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().min(8).required(),
    }).required()
    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});
    if (validatorError) {
        throw new BadRequestError('参数错误');
    }

    const {
        oldPassword,
        newPassword,
    } = ctx.request.body;
    const existUser = await osDb.select().from('user').where({
        id: ctx.state.user.id,
        password: encryptPassword(oldPassword),
    }).first();

    if (!existUser) {
        throw new BadRequestError('密码错误');
    }

    await osDb.update({
        password: encryptPassword(newPassword),
    })
        .where({
            id: ctx.state.user.id
        })

    ctx.body = {
        statusCode: STATUS_CODES.SUCCESS,
        message: '修改密码成功',
    }
}


export async function account(ctx, next) {
    if (ctx.state.user) {
        const user = await osDb.select('id', 'email', 'name').from('user').where('id', ctx.state.user.id).first();
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            user: {
                ...user,
                isLogin: true,
            }
        }
    } else {
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            user: {
                isLogin: false,
            }
        }
    }
}

export async function isLogin(ctx, next) {
    if (ctx.state.user) {
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            isLogin: true,
            message: '已登录',
        }
    } else {
        ctx.body = {
            statusCode: STATUS_CODES.SUCCESS,
            isLogin: false,
            message: '未登录',
        }
    }
}
