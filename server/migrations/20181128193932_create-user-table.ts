import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    })
};

exports.down = function (knex: Knex): Promise<any> {
    return knex.schema.dropTable('user');
};
