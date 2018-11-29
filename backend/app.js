var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');

var index = require('./routes/index');
// var users = require('./routes/users');
// var movies = require('./routes/movies');
var inquirydata = require('./routes/inquirymanaged');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // favicon의 위치...
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(history()) // 히스토리모드 사용, 항상 아래의 express.static 이전에 작성 해 주어야 함.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
// app.use('/api/movies', movies);
app.use('/api/inquiry', inquirydata);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
