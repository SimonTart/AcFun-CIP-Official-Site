/// <reference path="../typing.d.ts" />

const config = {
    knex: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'acfun_cip_os'
        }
    }
};

export default config;
