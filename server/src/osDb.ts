import * as knex from 'knex';
import config from './config';

const osDb: knex = knex({
    client: config.osKnex.client,
    connection: config.osKnex.connection,
});

export default osDb;
