require('ts-node/register')
const process = require('process');

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'acfun_cip_os'
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: process.env.DB_PASSPORT,
            database: 'acfun_cip_os'
        },
    }

};
