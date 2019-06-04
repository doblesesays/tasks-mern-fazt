const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev')); // console output of requests
app.use(express.urlencoded());
app.use(express.json()); // json

// routes
app.use('/api/tasks', require('./routes/task.routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});