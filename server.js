const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('dist'));

const options = {
	key: fs.readFileSync('certificates/key.pem'),
	cert: fs.readFileSync('certificates/cert.pem')
};

require('https').createServer(options, app).listen(3000);
console.log('Serving on https://localhost:3000');
