var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var url = process.env.MONGODB_URI;
mongoose.connect(url);
var db = mongoose.connection;
console.log('Connection url:'+url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    // we're connected!
    console.log("Connected correctly to server"); 
    var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
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

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use('/expenses',expenses);
app.use('/expensepayments',expensePayments);
app.use('/expensecategories', expenseCategories);
app.use('/expensesubcategories', expenseSubCategories);
app.use('/expenserepeats',expenseRepeats);

