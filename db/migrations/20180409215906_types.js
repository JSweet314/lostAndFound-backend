
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('locations', table => {
      table.dropColumn('lat');
      table.dropColumn('lng');
      table.string('name');
    }),
    knex.schema.table('items', table => {
      table.dropColumn('reward');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('locations', table => {
      table.dropColumn('lat');
      table.dropColumn('lng');
      table.dropColumn('name');
      table.integer('lat');
      table.integer('lng');
    }),
    knex.schema.table('items', table => {
      table.dropColumn('reward');
      table.integer('reward');
    })
  ])
};
