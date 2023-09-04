// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// require('dotenv').config();

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// import {InitiateMongoServer} from "./src/auth/db.js";
// import dotenv from "dotenv";

import indexRouter from "./src/routes/index.js";
import usersRouter from "./src/routes/users.js";
import FavouriteRouter from "./src/routes/fav.js";

// var indexRouter = require('./src/routes/index');
// var usersRouter = require('./src/routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// InitiateMongoServer();
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', FavouriteRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

export default app;
