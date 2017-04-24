const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

const index = require('./routes/index');
const items = require('./routes/items');
const users = require('./routes/users');

// Connect to database
mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
  console.log("Connected to database", config.database);
});

// On Error
mongoose.connection.on('error', function (err) {
  console.log('Database error: '+err);
});

// Express and Server port
const app = express();
const port = 3000;

//Cors middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', items);
app.use('/api', users);

// Server resends for client side routing
app.use(function (req, res) {
    res.sendFile(__dirname + 'client/index.html');
});

app.listen(port, function () {
    console.log("Server started on port " + port);
});
