const express = require('express');
const logger = require('morgan');

const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.render('welcome');
});

const cohortsRouter = require('./routes/cohortsRouter.js');
app.use('/cohorts', cohortsRouter);

const PORT = 5000;
const HOST = 'localhost';
app.listen(PORT, HOST, () => {
    console.log(`The server is listening on http://${HOST}:${PORT}]`);
});