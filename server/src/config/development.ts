/// <reference path="../typing.d.ts" />
import knexConfig from '../../knexfile';

const config: Config = {
    knex: knexConfig.development,
};

export default config;
