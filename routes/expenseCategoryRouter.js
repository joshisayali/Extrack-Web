var express= require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var ExpenseCategory = require('../models/expenseCategories');


var expenseCategoryRouter = express.Router();
expenseCategoryRouter.use(bodyParser.json());

expenseCategoryRouter.route('/')
.get(function(req,res,next){    
    
   ExpenseCategory.find({})    
    .exec(function(err,categories){
        if(err) throw err;        
        res.json(categories);
    });    
   
})
.post(function(req,res,next){
       
    ExpenseCategory.create(req.body, function(err,categories){
        if(err) throw err;        
        console.log('categories created');                
    });
})
.delete();

module.exports = expenseCategoryRouter;