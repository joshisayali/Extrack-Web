var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Expenses = require('../models/expenses');
var ExpensePayment = require('../models/expensePayments');
var ExpenseSubCategory = require('../models/expenseSubCategories');
var ExpenseRepeat = require('../models/expenseRepeats');
var Verify = require('./verify');

var expenseRouter = express.Router();
expenseRouter.use(bodyParser.json());

expenseRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){    
    
   Expenses.find({})    
    .sort('-expenseDate')
    .populate('expensePayment')
    .populate('expenseSubCategory')  
    .populate('expenseRepeat')
    .exec(function(err,expenses){
        if(err) {
            console.log('error from expense router');
            throw err;
        }
        res.json(expenses);
    });    
   
})
.post(Verify.verifyOrdinaryUser,function(req,res,next){
    console.log('inside post')
       
    Expenses.create(req.body, function(err,expense){
        if(err) {
            console.log(err);
            console.log('Request body:' + req.body);
            //throw err;
        }
        else{
            console.log('expense created');
        }        
    });
})
.delete(Verify.verifyOrdinaryUser, function(req,res,next){
    Expenses.remove({},function(err,resp){
        if(err) throw err;
        res.json(resp);
    });
});

expenseRouter.route('/users/:username')
.get(Verify.verifyOrdinaryUser,function(req,res,next){    
    
   Expenses.find({})
    .where('username').equals(req.params.username)
    .sort('-expenseDate')
    .populate('expensePayment')
    .populate('expenseSubCategory')  
    .populate('expenseRepeat')
    .exec(function(err,expenses){
        if(err) {
            console.log('error from expense router');
            throw err;
        }
        res.json(expenses);
    });    
   
})
.post(Verify.verifyOrdinaryUser,function(req,res,next){
    console.log('inside post')
       
    Expenses.create(req.body, function(err,expense){
        if(err) {
            console.log(err);
            console.log('Request body:' + req.body);
            //throw err;
        }
        else{
            console.log('expense created');
        }        
    });
});

expenseRouter.route('/users/:username/:from-:to')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    //var fromDate = Date.parse(req.params.from);
    //var toDate = Date.parse(req.params.to);
    console.log('Expense router:'+req.params.from + ','+req.params.to);
    
    Expenses.find({})
    .where('username').equals(req.params.username)
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

expenseRouter.route('/:from-:to')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
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
.get(Verify.verifyOrdinaryUser, function(req,res,next){
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
.put(Verify.verifyOrdinaryUser, function(req,res,next){
    Expenses.findByIdAndUpdate(req.params.expenseId,{$set:req.body},{new:true},function(err,expense){
        if(err) throw err;
        res.json(expense);
    })
})
.delete(Verify.verifyOrdinaryUser, function(req,res,next){
    Expenses.findByIdAndRemove(req.params.expenseId, function(err,resp){
        if(err) throw err;
        res.json(resp);
    })
});

expenseRouter.route('/users/:username/:expenseId')
.put(Verify.verifyOrdinaryUser, function(req,res,next){
    Expenses.findByIdAndUpdate(req.params.expenseId,{$set:req.body},{new:true},function(err,expense){
        if(err) throw err;
        res.json(expense);
    })
})
.delete(Verify.verifyOrdinaryUser, function(req,res,next){
    Expenses.findByIdAndRemove(req.params.expenseId, function(err,resp){
        if(err) throw err;
        res.json(resp);
    })
});

module.exports = expenseRouter;
