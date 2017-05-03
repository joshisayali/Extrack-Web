var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var ExpenseRepeat = require('../models/expenseRepeats');

var expenseRepeatRouter = express.Router();
expenseRepeatRouter.use(bodyParser.json());

expenseRepeatRouter.route('/')
.get(function(req,res,next){    
    
   ExpenseRepeat.find({})    
    .exec(function(err,repeats){
        if(err) throw err;        
        res.json(repeats);
    });    
   
})
.post(function(req,res,next){
       
    ExpenseRepeat.create(req.body, function(err,repeats){
        if(err) throw err;        
        console.log('repeats created');                
    });
})
.delete();

module.exports = expenseRepeatRouter;
