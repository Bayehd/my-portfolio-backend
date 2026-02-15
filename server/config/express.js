
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

let indexController = require('../app/controllers/index')

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/hello', indexController.hello);
// app.get('/bye', goodbye);
// app.use(notfound);

app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
});

module.exports = app;
