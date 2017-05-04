'use strict';
angular.module('extrackWebApp')
.controller('HomeController',['$scope','ngDialog',function($scope, ngDialog){
    $scope.bgImage = '../images/free-finance-books-760x463.jpg';
    
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
}]);