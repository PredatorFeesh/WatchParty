const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {Client}=require('pg');
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const client = new Client({
  user: 'watchpartyadmin',
  host: 'watchpartysandboxtwo.coclsxosaanb.us-east-2.rds.amazonaws.com',
  database: 'watchpartysandboxtwo',
  password: 'watchpartypassword',
  port: '5432',
})
client.connect(function(err) {
	console.log('reached this point');
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to PSQL database.');
});

connection.end();