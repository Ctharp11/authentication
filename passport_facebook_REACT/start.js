const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'})
require('./server/models/User');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
    console.error('error', err)
}) 

const app = require('./server/server');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running at ${server.address().port} `)
})