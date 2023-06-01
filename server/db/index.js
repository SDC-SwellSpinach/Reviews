const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Client } = require('pg');

console.log(process.env.HOST, process.env.PORT);
const client = new Client({
  database: 'reviews',
});

client.connect();

module.exports = client;
