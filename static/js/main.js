angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services'])

  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider.when('/about', {
      templateUrl: '../partials/about.html',
      controller: 'AboutCtrl'
    });
   
    $routeProvider.when('/login', {
      resolve: { action: function () { console.log("resolved") } }
    });
    
    // $routeProvider.otherwise();
  }]);