const express = require('express');

// Create express server
const app = express();
const port = 4000;

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
    })
})


// Listen express port
app.listen(port, () => {
    console.log(`Running server on port ${port}`);
} )