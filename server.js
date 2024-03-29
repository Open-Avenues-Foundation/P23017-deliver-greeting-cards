const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
app.use(bodyParser.json()) // for parsing application/json

const port = process.env.PORT || 3000;

const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client.connect();

app.use(express.json());


app.get('/api', (req, res) => {
  res.send('Hello World!');
});

// Sayeed
app.get('/api/events', async (req, res) => {
  const response = await client.query('SELECT * FROM events');
  res.send(response.rows);
  // TODO
  // this endpoint should return all events in the database
});

// Gabby
app.get('/api/events/:id', async (req, res) => {
  // TODO
  // this endpoint should return an event by its id
  const response = await client.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
  res.send(response.rows);
});

// Damaris
app.post('/api/events', async (req, res) => {
  // TODO
  const event_type = req.body.event_type;
  const date = req.body.date;
  const user_id = req.body.user_id;
  const response = await client.query('INSERT INTO events (event_type, date, user_id) VALUES($1, $2, $3) RETURNING *',[
  event_type,
  date,
  user_id,
  ]);
  res.send(response.rows[0]);
  // this endpoint should create a new event in the database
});

// Tameem
app.patch('/api/events/:id', async (req, res) => {
  // TODO
  var response = 0; 
  if(req.body.event_type != null){
     response = await client.query('UPDATE events SET event_type = $1 WHERE id = $2 RETURNING *', [req.body.event_type ,req.params.id]);
  }if(req.body.date != null){
     response = await client.query('UPDATE events SET date = $1 WHERE id = $2 RETURNING *', [req.body.date ,req.params.id]);
  } if(req.body.user_id != null){
     response = await client.query('UPDATE events SET user_id = $1 WHERE id = $2 RETURNING *', [req.body.user_id ,req.params.id]);
  }
  res.send(response.rows);
  // this endpoint should update an event by its id
});

// Tameem
app.get('/api/users', async (req, res) => {
  // TODO
  const response = await client.query('SELECT * FROM users');
  res.send(response.rows);
  // this endpoint should return all users in the database
});

// Damaris
app.get('/api/users/:id', async (req, res) => {
  // TODO
  const id = req.params.id;
  const response = await client.query('SELECT * FROM users WHERE id=$1', [id]);
  const userRow = response.rows[0];
  if(!userRow){
    res.status(404).send('HTTP Not Found Error');
    return;
  }
  res.send(userRow);
  // this endpoint should return a user by their id 
});

// Sayeed 
app.post('/api/users', async (req, res) => {
  // currently capable of taking static values in Postman and entering directly into DB
  // TODO: adjust to be dynamic
  const name = req.body.name;
  const address_id = req.body.address_id;
  const data_row = await client.query('INSERT INTO users (name, address_id) VALUES ($1, $2) Returning *', [
    name,
    address_id,
  ]);
  res.send(data_row.rows[0]);
  // this endpoint should create a new user in the database 
});

// Gabby
app.patch('/api/users/:id', async (req, res) => {
  // TODO
  var response = 0;
  if(req.body.name != null){
    response = await client.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [req.body.name,req.params.id]);
  }
  if(req.body.address_id != null){
    response = await client.query('UPDATE users SET address_id = $1 WHERE id = $2 RETURNING *', [req.body.address_id, req.params.id]);
  }
  res.send(response.rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
