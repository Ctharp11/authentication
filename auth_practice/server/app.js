const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiauth', { useNewUrlParser: true })

const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


//routes
app.use('/users', require('./routes/users'));

module.exports = app;
