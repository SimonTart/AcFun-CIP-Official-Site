/// <reference path="../typing.d.ts" />

import * as process from 'process';
import developmentConfig from './development';
import productionConfig from './production';

let config: Config;
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
    config = productionConfig;
} else {
    config = developmentConfig;
}

export default config;
