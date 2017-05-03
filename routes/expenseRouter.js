var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Expenses = require('../models/expenses');
var ExpensePayment = require('../models/expensePayments');
var ExpenseSubCategory = require('../models/expenseSubCategories');
var ExpenseRepeat = require('../models/expenseRepeats');


var expenseRouter = express.Router();
expenseRouter.use(bodyParser.json());

expenseRouter.route('/')
.get(function(req,res,next){    
    
   Expenses.find({})
    .sort('-expenseDate')
    .populate('expensePayment')
    .populate('expenseSubCategory')  
    .populate('expenseRepeat')
    .exec(function(err,expenses){
        if(err) throw err;
        //console.log(expenses[0]);
        res.json(expenses);
    });    
   
})
.post(function(req,res,next){
    console.log('inside post')
       
    Expenses.create(req.body, function(err,expense){
        if(err) {
            console.log(err);
            //throw err;
        }
        else{
            console.log('expense created');
        }        
    });
})
.delete(function(req,res,next){
    Expenses.remove({},function(err,resp){
        if(err) throw err;
        res.json(resp);
    });
});

expenseRouter.route('/:from-:to')
.get(function(req,res,next){
    //var fromDate = Date.parse(req.params.from);
    //var toDate = Date.parse(req.params.to);
    console.log('Expense router:'+req.params.from + ','+req.params.to);
    
    Expenses.find({})
    .where('expenseDate').gte(req.params.from).lte(req.params.to)
    .populate('expensePayment')
    .populate('expenseSubCategory')  
    .populate('expenseRepeat')
    .sort('-expenseDate')
    .exec(function(err,expenses){
       if(err) throw err;
        res.json(expenses);
    });
});

expenseRouter.route('/:expenseId')
.get(function(req,res,next){
    Expenses.findById(req.params.expenseId)
    .populate('expensePayment')
    .populate('expenseSubCategory')  
    .populate('expenseRepeat')
    .exec(function(err,expense){
        if(err) throw err;
        //console.log(expenses[0]);
        res.json(expense);
    });
})
.put(function(req,res,next){
    Expenses.findByIdAndUpdate(req.params.expenseId,{$set:req.body},{new:true},function(err,expense){
        if(err) throw err;
        res.json(expense);
    })
})
.delete(function(req,res,next){
    Expenses.findByIdAndRemove(req.params.expenseId, function(err,resp){
        if(err) throw err;
        res.json(resp);
    })
});

module.exports = expenseRouter;
