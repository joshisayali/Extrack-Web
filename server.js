var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/Extrack';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    // we're connected!
    console.log("Connected correctly to server");    
});
var expenses = require('./routes/expenseRouter');
var expensePayments = require('./routes/expensePaymentRouter');
var expenseCategories = require('./routes/expenseCategoryRouter');
var expenseSubCategories = require('./routes/expenseSubCategoryRouter');
var expenseRepeats = require('./routes/expenseRepeatRouter');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/expenses',expenses);
app.use('/expensepayments',expensePayments);
app.use('/expensecategories', expenseCategories);
app.use('/expensesubcategories', expenseSubCategories);
app.use('/expenserepeats',expenseRepeats);

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });