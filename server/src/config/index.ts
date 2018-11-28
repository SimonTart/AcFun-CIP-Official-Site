/// <reference path="../typing.d.ts" />

import * as process from 'process';
import developmentConfig from './development';
import productionConfig from './production';

let config: Config;
const APP_ENV = process.env.APP_ENV;

if (APP_ENV === 'production') {
    config = productionConfig;
} else {
    config = developmentConfig;
}

export default config;
