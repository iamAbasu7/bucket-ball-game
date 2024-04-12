import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('buckets', function(table) {
        table.increments('id').primary();
        table.string('bucket_name').notNullable();
        table.decimal('volume').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('buckets');
}

