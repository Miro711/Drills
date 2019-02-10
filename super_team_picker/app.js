const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

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