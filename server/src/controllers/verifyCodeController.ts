import * as Joi from 'joi';
import * as nanoid from 'nanoid';
import * as dayjs from 'dayjs'
import db from '../db';
import {VERIFY_CODE_TYPES} from '../common/constant';
import {sendRegisterMail,sendForgetPasswordMail} from '../utils/email';

export async function sendRegisterVerifyCode(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
    }).required();
    const { error: validatorError } = Joi.validate(ctx.request.body, validatorSchema, { allowUnknown: true });
    if(validatorError) {
        ctx.throw(400, '参数错误');
    }


    const { email } = ctx.request.body;
    try {
        let sendCode;
        const existVerifyCode = await db
            .select().from('verify_code')
            .where({
                email,
                type: VERIFY_CODE_TYPES.REGISTER,
                is_used: false,
            })
            .andWhere('created_at' , '>' , dayjs().startOf('day').format('YYYY-MM-DD HH:MM:SS'));

        if (existVerifyCode.length === 0) {
            const code = nanoid().slice(0,7);
            await db('verify_code').insert({
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
            message: '验证码已发送',
        };
    } catch (e) {
        throw e;
    }
    next();
}

export async function sendForgetPasswordVerifyCode(ctx, next) {
    const validatorSchema = Joi.object().keys({
        email: Joi.string().email().required(),
    }).required();
    const { error: validatorError } = Joi.validate(ctx.request.body, validatorSchema);
    if(validatorError) {
        ctx.throw(400, '参数错误');
    }

    const { email } = ctx.request.body;
    const existUser = await db.select().from('user').where({ email });
    if (existUser.length === 0) {
        ctx.throw(400, '该邮箱未注册');
    }

    try {
        let sendCode;
        const existVerifyCode = await db
            .select().from('verify_code')
            .where({
                email,
                type: VERIFY_CODE_TYPES.FORGET_PASSWORD,
                is_used: false,
            })
            .andWhere('created_at' , '>' , dayjs().startOf('day').format('YYYY-MM-DD HH:MM:SS'));

        if (existVerifyCode.length === 0) {
            const code = nanoid().slice(0,7);
            await db('verify_code').insert({
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
            message: '验证码已发送',
        };
    } catch (e) {
        throw e;
    }
    next();
}
