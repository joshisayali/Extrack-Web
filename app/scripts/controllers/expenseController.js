'use strict';
angular.module('extrackWebApp')
.controller('ExpenseController', ['$scope','expenseFactory', function($scope, expenseFactory){
    //variables
    $scope.message = 'this is expense controller';
    $scope.editMode = false;
    $scope.newExpense = {expenseDate:'',expenseItem:'',expenseAmount:'',expensePayment:'',expenseSubCategory:'',expenseRepeat:''};
    $scope.filterData = {fromDate:'',toDate:''};
    
    //routes
    $scope.expenses = expenseFactory.getExpenses().query(
        function(response){
            $scope.expenses = response;
        
        },function(error){
            console.log('Error: '+error);
        }
    );
    
    $scope.expenseCategories = expenseFactory.getExpenseCategories().query(
        function(response){
            $scope.expenseCategories = response;
        },function(error){
            console.log('Error: '+error);
        });
    
    $scope.expenseSubCategories = expenseFactory.getExpenseSubCategories().query(
        function(response){
            $scope.expenseSubCategories = response;
        },function(error){
            console.log('Error: '+error);
        });
    
    $scope.expensePayments = expenseFactory.getExpensePayments().query(
        function(response){
            $scope.expensePayments = response;
        },function(error){
            console.log('Error: '+error);
        });
    
    $scope.expenseRepeats = expenseFactory.getExpenseRepeats().query(
        function(response){
            $scope.expenseRepeats = response;
        },function(error){
            console.log('Error: '+error);
        });
    
    //functions
    $scope.createExpense = function(){
        
        console.log($scope.newExpense);
        expenseFactory.getExpenses().create($scope.newExpense);
        $scope.newExpense = {expenseDate:'',expenseItem:'',expenseAmount:'',expensePayment:'',expenseSubCategory:'',expenseRepeat:''};
        $scope.createExpenseForm.$setPristine();
    };
    
    $scope.filterExpenses = function(){
        var fromDate = Date.parse($scope.filterData.fromDate);
        var toDate = Date.parse($scope.filterData.toDate);
        console.log('Expense controller:' + fromDate + ',' + toDate);
        
        /*$scope.expenses = expenseFactory.getExpenses().query(
            {from:fromDate,to:toDate},
            function(response){
                $scope.expenses = response;

            },function(error){
                console.log('Error: '+error);
            }
        );*/        
        
        $scope.expenses = expenseFactory.getSpecificExpenses().query(
            {from:fromDate,to:toDate},
            function(response){
                $scope.expenses = response;
            },
            function(error){
                console.log('Error: '+error);
            });
        
        $scope.filterData = {fromDate:'',toDate:''};       
        $scope.filterForm.$setPristine();
    };
    
    $scope.saveExpense = function(expense){
        $scope.expense = expense;
        console.log('Save Expense');
        console.log($scope.expense);
        
        expenseFactory.getExpenses().update({id:$scope.expense._id},$scope.expense)
        .$promise.then(
            function(resp){
                console.log(resp);
                $scope.expenses = expenseFactory.getExpenses().query(
                    function(response){
                        $scope.expenses = response;

                    },function(error){
                        console.log('Error: '+error);
                    });
            },
            function(error){
                console.log(error);
            });
        
        $scope.toggleEditMode();
        
    };
    
    $scope.deleteExpense = function(id){
        
         expenseFactory.getExpenses().delete({id:id})
        .$promise.then(
            function(resp){
                console.log(resp);
                $scope.expenses = expenseFactory.getExpenses().query(
                    function(response){
                        $scope.expenses = response;

                    },function(error){
                        console.log('Error: '+error);
                    });
            },
            function(error){
                console.log(error);
            });
        
    };
    
    $scope.toggleEditMode = function(id){
        $scope.editMode = !$scope.editMode;
        $scope.editModeId = id;
    };
    
    //display total amount     
    $scope.getTotal = function(){ 
        var total = 0;
        for(var i=0; i < $scope.expenses.length; i++)
        {
            total += $scope.expenses[i].expenseAmount;
            
        }
        return total;
    };        
    
}]);
            
            
    
