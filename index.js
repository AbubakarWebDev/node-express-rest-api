const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const debug = require('debug')('app:startup');

const logger = require('./middlewares/logger');
const homeRouter = require('./routes/web/home');
const usersRouter = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 3000;

// Using different middlewares in out application.
// for secure express app by setting various HTTP headers.
app.use(helmet()); 

// for using our custom logger middle
app.use(logger);

// for parsing requests body to JSON Object.
app.use(express.json());  

// for serving static files on the public folder
app.use(express.static('public'));  

// for parsing requests form data to JSON Object.
app.use(express.urlencoded({ extended: true })); 

// Attaching the router with our express app
app.use('/', homeRouter);
app.use('/api/users', usersRouter);

// for HTTP request logger.
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug("morgan works...");
}

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});