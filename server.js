var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');

//var url = process.env.MONGODB_URI;
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
console.log('Connection url:'+config.mongoUrl);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    // we're connected!
    console.log("Connected correctly to server"); 
    var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

var users = require('./routes/users');
var expenses = require('./routes/expenseRouter');
var expensePayments = require('./routes/expensePaymentRouter');
var expenseCategories = require('./routes/expenseCategoryRouter');
var expenseSubCategories = require('./routes/expenseSubCategoryRouter');
var expenseRepeats = require('./routes/expenseRepeatRouter');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use('/users', users);
app.use('/expenses',expenses);
app.use('/expensepayments',expensePayments);
app.use('/expensecategories', expenseCategories);
app.use('/expensesubcategories', expenseSubCategories);
app.use('/expenserepeats',expenseRepeats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

