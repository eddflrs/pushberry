'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngCookies'])
  
  .controller('AboutCtrl', ['$scope', function($scope) {
    
  }])
  
  .controller('ProjectsCtrl', ['$scope', '$timeout', '$cookies', '$http', function ($scope, $timeout, $cookies, $http) {
    
    $scope.projects = [
      {title: "Foobar"},
      {title: "Barfoo"}
    ];

    $scope.fetchProjects = function () {
      
      console.log("Will fetch projects ", $cookies.accessToken);

      var projectsRequest = $http({
        method: 'GET',
        url: 'https://api.github.com/users/' + 'eddflrs' + '/repos'
      });
     
     projectsRequest.success(function (data) {
       console.log('success ', data);
       $scope.projects = data;
     });
     
     projectsRequest.error(function (data) {
       console.log('error ', data);
     });
     
      $timeout(function () {
        $scope.projects.push({title: "Something added"});
      }, 2000);
    }
  }]);