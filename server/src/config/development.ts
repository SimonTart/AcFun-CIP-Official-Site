/// <reference path="../typing.d.ts" />
const knexConfig = require('../../knexfile');
import * as process from 'process';

const config: Config = {
    knex: knexConfig.development,
    encryptPasswordSalt: 'acfun-cip',
    appKeys: ['acfun-cip'],
    email: {
        pool: true,
        host: 'smtp.exmail.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    }
};

export default config;
