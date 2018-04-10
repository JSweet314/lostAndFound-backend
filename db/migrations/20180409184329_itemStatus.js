
exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.table('items', table => {
      table.string('status');
    })
  )
};

exports.down = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.table('items', table => {
      table.dropColumn('status');
    })
  );
};
