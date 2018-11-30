import * as knex from 'knex';
import config from './config';

const db: knex = knex({
    client: config.knex.client,
    connection: config.knex.connection,
});

export default db;
