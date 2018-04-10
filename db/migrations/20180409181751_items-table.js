
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', table => {
      table.increments('id').primary();
      table.integer('lat');
      table.integer('lng');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('items', table => {
      table.increments('id').primary();
      table.integer('location_id').unsigned();
      table.foreign('location_id').references('locations.id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('name');
      table.string('description');
      table.string('date');
      table.string('reward');
      table.timestamps(true, true);
    })
  ]);
}

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('items')
  ]);
}