const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// Importing all routers
let indexRouter = require('../app/routes/index');
let referencesRouter = require('../app/routes/references');
let authRouter = require('../app/routes/auth'); 
let projectsRouter = require('../app/routes/projects');
let servicesRouter = require('../app/routes/services');
let usersRouter = require('../app/routes/user');

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registering routes
app.use('/', indexRouter);
app.use('/api/references', referencesRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/users', usersRouter);

// 404 handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message
    });
});

module.exports = app;