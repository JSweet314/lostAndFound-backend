
exports.seed = (knex, Promise) => 
  knex('users').del()
    .then(() => Promise.all([
      knex('users').insert(
      {username: 'jsweet314', email: 'jon@gmail.com', password: 'abc'}, 
      'id'
      ),
      knex('users').insert(
      {username: 'psweet303', email: 'pat@gmail.com', password: 'def'}, 
      'id'
      )])
    );
