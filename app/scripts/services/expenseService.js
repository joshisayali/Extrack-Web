'use strict';
angular.module('extrackWebApp')
.constant('baseURL','http://localhost:3000/')
.service('expenseFactory',['$resource','baseURL',function($resource,baseURL){
    
    this.getExpenses = function(){
        return $resource(baseURL+'expenses/:id',null,{'create':{method:'POST'},'update':{method:'PUT'},'delete':{method:'DELETE'}});          
    }; 
    
    this.getSpecificExpenses = function(){        
        return $resource(baseURL+'expenses/:from-:to');
    };
    
    this.getExpenseCategories = function(){
        return $resource(baseURL+'expensecategories');
    };
    
    this.getExpenseSubCategories = function(){
        return $resource(baseURL+'expensesubcategories');
    };
    
    this.getExpensePayments = function(){
        return $resource(baseURL+'expensepayments');
    };
    
    this.getExpenseRepeats = function(){
        return $resource(baseURL+'expenserepeats');
    };
    
    
}]);