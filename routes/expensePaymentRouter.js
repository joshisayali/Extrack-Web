var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var ExpensePayment = require('../models/expensePayments');

var expensePaymentRouter = express.Router();
expensePaymentRouter.use(bodyParser.json());

expensePaymentRouter.route('/')
.get(function(req,res,next){    
    
   ExpensePayment.find({})    
    .exec(function(err,payments){
        if(err) throw err;        
        res.json(payments);
    });    
   
})
.post(function(req,res,next){
       
    ExpensePayment.create(req.body, function(err,payments){
        if(err) throw err;        
        console.log('payments created');                
    });
})
.delete();

module.exports = expensePaymentRouter;
