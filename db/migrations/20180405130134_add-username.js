exports.up = function(knex, Promise) {
  Promise.all([
    knex.schema.table('users', table => {
      table.string('username');
    })
  ]);
} 

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.table('users', table => {
      table.dropColumn('username');
    })
  ]);
} 