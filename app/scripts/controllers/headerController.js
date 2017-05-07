'use strict';
angular.module('extrackWebApp')
.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'authFactory', function ($scope, $state, $rootScope, ngDialog, authFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(authFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = authFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       authFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $state.go('app', {}, {reload: true});
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = authFactory.isAuthenticated();
        $scope.username = authFactory.getUsername();
        $state.go('app.expense', {}, {reload: true});
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = authFactory.isAuthenticated();
        $scope.username = authFactory.getUsername();
        $state.go('app.expense', {}, {reload: true});
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}]);