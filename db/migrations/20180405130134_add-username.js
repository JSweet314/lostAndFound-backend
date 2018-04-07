export const up = (knex, Promise) => Promise.all([
  knex.schema.table('users', table => {
    table.string('username');
  })
]);

export const down = (knex, Promise) => Promise.all([
  knex.schema.table('users', table => {
    table.dropColumn('username');
  })
]);