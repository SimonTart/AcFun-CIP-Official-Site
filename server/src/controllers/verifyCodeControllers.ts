import * as Joi from 'joi';
import * as nanoid from 'nanoid';
import * as dayjs from 'dayjs'
import osDb from '../osDb';
import {VERIFY_CODE_TYPES} from '../common/constant';
import {sendRegisterMail, sendForgetPasswordMail} from '../utils/email';
import {BadRequestError} from '../common/errors';
import {STATUS_CODES} from '../common/constant';

export async function sendRegisterVerifyCode(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
    }).required();
    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});
    if (validatorError) {
        throw new BadRequestError();
    }


    const {email} = ctx.request.body;
    let sendCode;
    const existVerifyCode = await osDb
        .select().from('verify_code')
        .where({
            email,
            type: VERIFY_CODE_TYPES.REGISTER,
            is_used: false,
        })
        .andWhere('created_at', '>', dayjs().startOf('day').format('YYYY-MM-DD HH:MM:SS'));

    if (existVerifyCode.length === 0) {
        const code = nanoid().slice(0, 7);
        await osDb('verify_code').insert({
            email,
            code,
            type: VERIFY_CODE_TYPES.REGISTER,
        });
        sendCode = code;
    } else {
        sendCode = existVerifyCode[0].code;
    }

    await sendRegisterMail(email, sendCode);
    ctx.body = {
        statusCode: STATUS_CODES.SUCCESS,
        message: '验证码已发送',
    };
}

export async function sendForgetPasswordVerifyCode(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
    }).required();
    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema);
    if (validatorError) {
        throw new BadRequestError();
    }

    const {email} = ctx.request.body;
    const existUser = await osDb.select().from('user').where({email});
    if (existUser.length === 0) {
        throw new BadRequestError('该邮箱未注册');
    }

    let sendCode;
    const existVerifyCode = await osDb
        .select().from('verify_code')
        .where({
            email,
            type: VERIFY_CODE_TYPES.FORGET_PASSWORD,
            is_used: false,
        })
        .andWhere('created_at', '>', dayjs().startOf('day').format('YYYY-MM-DD HH:MM:SS'));

    if (existVerifyCode.length === 0) {
        const code = nanoid().slice(0, 7);
        await osDb('verify_code').insert({
            email,
            code,
            type: VERIFY_CODE_TYPES.FORGET_PASSWORD,
        });
        sendCode = code;
    } else {
        sendCode = existVerifyCode[0].code;
    }

    await sendForgetPasswordMail(email, sendCode);
    ctx.body = {
        statusCode: STATUS_CODES.SUCCESS,
        message: '验证码已发送',
    };
}
