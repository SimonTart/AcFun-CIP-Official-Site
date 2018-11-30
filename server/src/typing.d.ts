declare interface Config {
    knex: {
        client: string,
        connection: {
            host : string,
            user : string,
            password : string,
            database : string
        }
    },
    encryptPasswordSalt: string,
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
