'use strict';
angular.module('extrackWebApp')
.controller('ExpenseController', ['$scope','$state','expenseFactory','authFactory','ngDialog', function($scope,$state, expenseFactory, authFactory, ngDialog){
    /*----------------------------------------variables----------------------------------------------*/
    $scope.message = 'Loading...';
    $scope.editMode = false;
    $scope.newExpense = {expenseDate:'',expenseItem:'',expenseAmount:'',expensePayment:'',expenseSubCategory:'',expenseRepeat:''};
    $scope.filterData = {fromDate:'',toDate:''};
    $scope.showError = false;  
    $scope.customErrorMessage = "Error Occured. Please try again. Error Details:";
    $scope.isFilter=false;
    
    /*----------------------------------------routes---------------------------------------------------*/
    
    /*$scope.expenses = expenseFactory.getExpenses().query(
        function(response){
            $scope.expenses = response;
        
        },function(error){
            console.log('Error: '+error);
        }
    );*/
    
    //get expenses for a user
    $scope.expenses = expenseFactory.getUserExpenses().query({username: authFactory.getUsername()})
    .$promise.then(
        function(response){
            $scope.expenses = response;
            $scope.showError = false;
        
        },function(error){
            console.log(authFactory.getUsername());
            console.log(error);
            $scope.showError = true;
            $scope.message = $scope.customErrorMessage + error.data.message;
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
    
    /*-----------------------------------------functions----------------------------------------------------*/
    $scope.openCreateExpense = function(){
        ngDialog.open({ template: 'views/createExpense.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
    $scope.createExpense = function(){
        //create expense for a user
        $scope.newExpense.username = authFactory.getUsername();
        expenseFactory.getUserExpenses().create({username: authFactory.getUsername()},$scope.newExpense)
        .$promise.then(
            function(resp){
                console.log(resp);
                ngDialog.close(); 
                $scope.showError = false;
                $state.go($state.current, {}, {reload: true});
            },
            function(error){
                console.log(error);
                ngDialog.close();
                $scope.showError = true;
                $scope.message = $scope.customErrorMessage + error.data.message;
                
            });
        
        $scope.newExpense = {expenseDate:'',expenseItem:'',expenseAmount:'',expensePayment:'',expenseSubCategory:'',expenseRepeat:''};
        $scope.createExpenseForm.$setPristine();        
        
    };
    
   $scope.filterExpenses = function(){
        var fromDate = Date.parse($scope.filterData.fromDate);
        var toDate = Date.parse($scope.filterData.toDate);
        console.log('Expense controller:' + fromDate + ',' + toDate);
        
       $scope.expenses = expenseFactory.getSpecificExpenses().query(
            {username: authFactory.getUsername(),from:fromDate,to:toDate},
            function(response){
                $scope.expenses = response;
                $scope.showError = false;
                $scope.isFilter=true;
            },
            function(error){
                console.log('Error: '+error);
                $scope.showError = true;
                $scope.message = $scope.customErrorMessage + error.data.message;
            });
        
        $scope.filterData = {fromDate:'',toDate:''};       
        $scope.filterForm.$setPristine();
    };
    
    $scope.saveExpense = function(expense){
        $scope.expense = expense;
        console.log('Save Expense');
        //console.log($scope.expense);
        
        expenseFactory.getUserExpenses()
            .update({username: authFactory.getUsername(),expenseId:$scope.expense._id},$scope.expense)
        .$promise.then(
            function(resp){
                console.log(resp);
                $scope.showError = false;
                $state.go($state.current, {}, {reload: true});
            },
            function(error){
                console.log(error);
                $scope.showError = true;
                $scope.message = $scope.customErrorMessage + error.data.message;
            });
        
        $scope.toggleEditMode();
        
    };
    
    $scope.deleteExpense = function(id){
        
         expenseFactory.getUserExpenses().delete({username: authFactory.getUsername(),expenseId:id})
        .$promise.then(
            function(resp){
                console.log(resp);
                $scope.showError = false;
                $state.go($state.current, {}, {reload: true});
            },
            function(error){
                console.log(error);
                $scope.showError = true;
                $scope.message = $scope.customErrorMessage + error.data.message;
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
            
            
    
