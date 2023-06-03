const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan('tiny'));

app.use(cors());
// app.get('/loaderio-a8089335daa66efc9b2b4dcecc69b4ac', (req, res) => res.send('loaderio-a8089335daa66efc9b2b4dcecc69b4ac'));
app.use('/', router);

module.exports = app;
