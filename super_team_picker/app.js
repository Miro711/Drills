const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

const PORT = 5000;
const HOST = 'localhost';
app.listen(PORT, HOST, () => {
    console.log(`The server is listening on htt[://${HOST}:${PORT}]`);
});