import * as knex from 'knex';
import config from './config';

const obDb: knex = knex({
    client: config.obKnex.client,
    connection: config.obKnex.connection,
});

export default obDb;
