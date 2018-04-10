
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('locations', table => {
      table.float('lat');
      table.float('lng');
    }),
    knex.schema.table('items', table => {
      table.float('reward');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('locations', table => {
      table.dropColumn('lat');
      table.dropColumn('lng');
    }),
    knex.schema.table('items', table => {
      table.dropColumn('reward');
    })
  ])
};
