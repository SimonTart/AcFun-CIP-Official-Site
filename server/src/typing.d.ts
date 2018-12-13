interface KnexConfig {
    client: string,
    connection: {
        host : string,
        user : string,
        password : string,
        database : string
    }
}


interface Config {
    osKnex: KnexConfig,
    obKnex: KnexConfig,
    encryptPasswordSalt: string,
    appKeys: Array<string>,
    email: {
        pool: boolean,
        host: string,
        port: number,
        secure: boolean,
        auth: {
            user: string,
            pass: string
        }
    },
}
