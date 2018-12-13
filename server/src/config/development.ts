/// <reference path="../typing.d.ts" />
const knexConfig = require('../../knexfile');
import * as process from 'process';

const config: Config = {
    osKnex: knexConfig.development,
    obKnex: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'eva_acfun_dev'
        },
    },
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
