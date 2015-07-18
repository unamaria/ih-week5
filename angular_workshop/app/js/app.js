'use strict';

// Declare app level module
var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(['$routeProvider', '$locationProvider',

    function ($routeProvider, $location) {

        $routeProvider.when('/view1', {
            templateUrl: 'partials/view1.html',
            controller: 'View1Ctrl'
        });

        $routeProvider.when('/view2', {
            templateUrl: 'partials/view2.html',
            controller: 'View2Ctrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/view1'

        });
        
  }]);
