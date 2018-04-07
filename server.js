const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
app.use(bodyParser.json());

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then(users => { response.status(200).json(users) })
    .catch(error => { response.status(500).json({ error }) });
})

app.post('/api/v1/users/new', (request, response) => {
  const user = request.body;
  for (let requiredParameter of ['username', 'email', 'password']) {
    if (!user[requiredParameter]) {
      return response.status(422)
        .send({ error: 
          `Expected format: 
            {username: <String>, email: <String>, password: <String>}. 
          You are missing a ${requiredParameter} property.` 
        });
    }
  }

  database('users').insert(user, 'id')
    .then(user => {
      response.status(201).json({ id: user[0] })
    })
    .catch(error => {
      response.status(500).json(new Error(`insert user failed: ${error}`))
    });
});

app.post('/api/v1/users/signIn', (request, response) => {
  const signInParams = request.body;
  for (let requiredParameter of ['email', 'password']) {
    if (!signInParams[requiredParameter]) {
      return response.status(422)
        .send({error: `Expected ${requiredParameter} parameter missing.`});
    }
  }

  database('users')
    .where('email', signInParams.email)
    .andWhere('password', signInParams.password)
    .then(user => {
      console.log(user);
      response.status(201).json({username: user[0].username, id: user[0].id});
    })
    .catch(error => {
      response.status(500).json(new Error(`couldn't find user: ${error}`))
    })
});

app.listen(3000, () => {
  console.log('Express lostAndFound running on localhost:3000');
});