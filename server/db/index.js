const { Client } = require('pg');

const client = new Client({
  database: 'reviews',
});

client.connect();

module.exports = client;
