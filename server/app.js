const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.use(cors());
app.use('/', router);

module.exports = app;
