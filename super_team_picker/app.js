const express = require('express');
const app = express();

const PORT = 5000;
const HOST = 'localhost';
app.listen(PORT, HOST, () => {
    console.log(`The server is listening on htt[://${HOST}:${PORT}]`);
});