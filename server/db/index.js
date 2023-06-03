const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Client } = require('pg');
// console.log(process.env.DATABASE);
// console.log(process.env.HOST, process.env.PORT);
const client = new Client({
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
});

client.connect();

module.exports = client;
