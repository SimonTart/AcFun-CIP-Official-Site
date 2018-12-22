/// <reference path="../typing.d.ts" />
const knexConfig = require('../../knexfile');
import * as process from "process";

const config = {
    osKnex: knexConfig.production,
    obKnex: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: process.env.DB_PASSPORT,
            database: 'eva_acfun'
        },
    },
    encryptPasswordSalt: 'acfun-cip-os',
    appKeys: ['acfun-cip-os'],
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
