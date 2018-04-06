exports.up = (knex, Promise) => Promise.all([
  knex.schema.table('users', table => {
    table.string('username');
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.table('users', table => {
    table.dropColumn('username');
  })
]);