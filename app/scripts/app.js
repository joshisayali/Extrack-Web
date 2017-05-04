'use strict';

/**
 * @ngdoc overview
 * @name extrackWebApp
 * @description
 * # extrackWebApp
 *
 * Main module of the application.
 */
angular
  .module('extrackWebApp', [
    'ngResource',
    'ui.router',
    'ngDialog'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app',{
        url:'/',
        views:{
            'header': {
                templateUrl : 'views/header.html',
                controller: 'HeaderController'
            },
            'content': {
                templateUrl : 'views/home.html',
                controller: 'HomeController'
            },
            'footer': {
                templateUrl : 'views/footer.html'
            }
        }
    })
    .state('app.expense',{
        url:'expense',
        views:{
            'content@':{
                templateUrl:'views/expense.html',
                controller: 'ExpenseController'
            }
        }
    });    
    $urlRouterProvider.otherwise('/');
  });
