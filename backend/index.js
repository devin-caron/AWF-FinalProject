// Base dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Additional dependencies
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const TasksRoute = require('./routes/TaskRoute.js');
const UsersRoute = require('./routes/UserRoute.js');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: "*" }));


// Rerout the endpoints
app.use('/api/v1/tasks', TasksRoute);
app.use('/api/v1/users/', UsersRoute);


// Connect to mongodb
mongoose.connect(process.env.MONGODB_URI, () => console.log('Connected to the databse.'));


// Start the server
const port = process.env.POROT || 5000;
app.listen(5000, () => console.log('listening on port ' + port));

