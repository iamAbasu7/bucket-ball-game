import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('balls', function(table) {
        table.increments('id').primary();
        table.string('ball_name').notNullable();
        table.decimal('volume').notNullable();
        table.decimal('number_of_balls').nullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('balls');
}

