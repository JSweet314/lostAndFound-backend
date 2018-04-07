export const up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email');
    table.string('password');
    table.timestamps(true, true);
  })
]);

export const down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users')
]);