import * as Knex from "knex";

exports.up = function (knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary();
        table.string('name').notNullable().comment('用户昵称');
        table.string('email').notNullable().comment('用户邮箱');
        table.string('password').notNullable().comment('用户密码');
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

exports.down = function (knex: Knex) {
    return knex.schema.dropTable('user');
};
