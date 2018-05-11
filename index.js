const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();

app.set('port', process.env.PORT || 3000);
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
        .send({
          error:
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
        .send({ error: `Expected ${requiredParameter} parameter missing.` });
    }
  }
  database('users')
    .where('email', signInParams.email)
    .andWhere('password', signInParams.password)
    .then(user => {
      response.status(201).json({ username: user[0].username, id: user[0].id });
    })
    .catch(error => {
      response.status(500).json(new Error(`couldn't find user: ${error}`))
    })
});

app.post('/api/v1/locations/new', (request, response) => {
  const location = request.body;
  console.log(location);
  for (let requiredParameter of ['name', 'lat', 'lng']) {
    if (!location[requiredParameter]) {
      return response.status(450)
        .send({ error: `Expected ${requiredParameter} parameter missing.` });
    }
  }
  database('locations').insert(location, 'id')
    .then(location => {
      response.status(201).json({ id: location[0] })
    })
    .catch(error => {
      response.status(500).json(new Error(`error posting location: ${error}`))
    })
});

app.post('/api/v1/items/new', (request, response) => {
  const item = request.body;
  for (let requiredParameter of
    ['name', 'description', 'location', 'userId', 'status', 'date']) {
    if (!item[requiredParameter]) {
      return response.status(422)
        .send({ error: `Expected ${requiredParameter} parameter missing.` });
    }
  }
  const { name, description, reward, date, status, userId, location } = item;
  const formattedItem = {
    name,
    description,
    reward: reward || null,
    date,
    status,
    user_id: userId,
    location_id: location
  }
  database('items').insert(formattedItem, 'id')
    .then(item => {
      response.status(201).json({ id: item[0] })
    })
    .catch(error => {
      response.status(500).json(new Error(`error posting item: ${error}`))
    })
});

app.post('/api/v1/items', (request, response) => {
  const user = request.body;
  if (!user.id) {
    return response.status(422)
      .send({ error: 'must provide a user id' });
  }
  database('items').where('user_id', user.id)
    .then(items => items.map(item => ({
      name: item.name,
      description: item.description,
      date: item.date,
      status: item.status,
      reward: item.reward,
      locationId: item.location_id,
      itemId: item.id
    })))
    .then(items => {
      response.status(201).json(items);
    })
    .catch(error => {
      response.status(500).json(new Error(`error retrieving items: ${error}`))
    });
});

app.post('/api/v1/locations', (request, response) => {
  const location = request.body;
  if (!location.id) {
    return response.status(422)
      .send({ error: 'must provide location id' });
  }
  database('locations').where('id', location.id)
    .then(location => {
      response.status(201).json({
        name: location[0].name,
        lat: location[0].lat,
        lng: location[0].lng
      });
    })
    .catch(error => {
      response.status(500).json(
        new Error(`error retrieving location: ${error}`)
      )
    });
});

app.listen(3000, () => {
  console.log('Express lostAndFound running on localhost:3000');
});