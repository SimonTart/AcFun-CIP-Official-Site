import * as nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport(config.email);

transporter.verify(function (error,) {
    if (error) {
        console.error('Email: nodemailer is not work');
        console.error(error);
    } else {
        console.log('Email Server is ready to take our messages');
    }
});


export function sendRegisterMail(to: string, code: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from: config.email.auth.user,
            to,
            subject: '注册验证码',
            html: `您正在注册 A站评论补全计划（AcFunCIP），验证码为<h2><b>${code}</b></h2>`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

export function sendForgetPasswordMail(to: string, code: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from: config.email.auth.user,
            to,
            subject: '重置密码',
            html: `您正在重置 A站评论补全计划（AcFunCIP）的密码，验证码为<h2><b>${code}</b></h2>`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}
