require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const documentation = require('./controllers/documentation');
const endpoints = require('./controllers/endpoints');
const executor = require('./controllers/executor');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', documentation);
app.get('/:repo', endpoints);
app.use('/:repo/*?', executor);

app.listen(process.env.PORT || 3000);
