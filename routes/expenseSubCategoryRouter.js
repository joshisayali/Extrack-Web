var express= require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var ExpenseSubCategory = require('../models/expenseSubCategories');
var ExpenseCategory = require('../models/expenseCategories');


var expenseSubCategoryRouter = express.Router();
expenseSubCategoryRouter.use(bodyParser.json());

expenseSubCategoryRouter.route('/')
.get(function(req,res,next){    
    
   ExpenseSubCategory.find({})  
    .populate('expenseCategory')
    .exec(function(err,subcategories){
        if(err) throw err;        
        res.json(subcategories);
    });    
   
})
.post(function(req,res,next){
       
    ExpenseSubCategory.create(req.body, function(err,subcategories){
        if(err) throw err;        
        console.log('subcategories created');                
    });
})
.delete();

module.exports = expenseSubCategoryRouter;