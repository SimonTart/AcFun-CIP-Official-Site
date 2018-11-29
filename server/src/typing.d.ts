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
    encryptPasswordSalt: String,
}
