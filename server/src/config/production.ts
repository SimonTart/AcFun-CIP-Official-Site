/// <reference path="../typing.d.ts" />

import * as process from "process";

const config = {
    osKnex: {
        client: 'mysql',
        connection: {
            host: process.env.OS_HOST,
            user: process.env.OS_USER,
            password: process.env.OS_PASSWORD,
            database: process.env.OS_DATABASE
        }
    },
    obKnex: {
        client: 'mysql',
        connection: {
            host: process.env.OB_HOST,
            user: process.env.OB_USER,
            password: process.env.OB_PASSWORD,
            database: process.env.OB_DATABASE
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
