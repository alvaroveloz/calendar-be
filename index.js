const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Create express server
const app = express();
const port = process.env.PORT;

// Database
dbConnection();

//CORS
app.use(cors());

// Public Directory
app.use(express.static('public'));

// Read and parse of body
app.use( express.json());


// Routes
app.use('/api/auth', require('./routes/auth'));


// Listen express port
app.listen(port, () => {
    console.log(`Running server on port ${port}`);
} )