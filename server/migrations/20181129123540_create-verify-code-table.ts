import * as Knex from "knex";
import {TableBuilder} from "knex";

exports.up = function (knex: Knex) {
    return knex.schema.createTable('verify_code', (table: TableBuilder) => {
        table.increments('id');
        table.string('email').notNullable().comment('邮箱');
        table.integer('type').notNullable().comment('验证码类型：1 注册 2 重置密码');
        table.string('code').notNullable().comment('验证码');
        table.boolean('is_used').notNullable().defaultTo(false).comment('是否被使用');
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
};

exports.down = function (knex: Knex) {
    return knex.schema.dropTable('verify_code');
};
