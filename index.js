const express = require('express');
require('dotenv').config();

// Create express server
const app = express();
const port = process.env.PORT;

// Public Directory
app.use(express.static('public'));


// Routes
// app.get('/', (req, res) => {
//     res.json({
//         ok: true,
//     })
// })


// Listen express port
app.listen(port, () => {
    console.log(`Running server on port ${port}`);
} )