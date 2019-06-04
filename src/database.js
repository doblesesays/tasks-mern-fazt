const mongoose = require('mongoose');

const URI = 'mongodb://localhost/tasks-mern-fazt';

mongoose.connect(URI, { useNewUrlParser: true })
    .then( db => console.log("Connected to database"))
    .catch( err => console.log(err));

module.exports = mongoose;
