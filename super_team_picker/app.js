const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
	methodOverride((req, res) => {
		if (req.body && req.body._method) {
			const method = req.body._method;
			return method;
		}
	}),
);

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