const express = require('express');

const app = express();
app.use(express.static('dist'));

require('http').createServer(app).listen(3000);
console.log('Serving on http://localhost:3000');