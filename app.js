var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require("ejs");
var cors = require('cors');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".html", ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var history = require('connect-history-api-fallback');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(history());

app.use('/api', indexRouter);
app.use('/index/api', indexRouter);
app.use('/index/api/loginIn', loginRouter);
app.use('/api/loginIn', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(cors({
  origin: ['http://localhost:9210'],
  methods: ['GET', 'POST', "PUT", "DELETE"]
}));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9210');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

module.exports = app;
