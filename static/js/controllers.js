'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', ['ngCookies'])

app.controller('AboutCtrl', ['$scope', function($scope) {}])
  
app.controller('ProjectsCtrl', ['$scope', '$timeout', '$cookies', '$http', 'Projects', function ($scope, $timeout, $cookies, $http, Projects) {
    
    console.log("ProjectsCtrl called with ", Projects);
    
    $scope.projects = Projects;
    $scope.syncedProjectsCount = 0;

    $scope.countSyncedProjects = function (projects) {
      console.log("counting synced projects");
        var count = 0, i = 0;
        for (i; i < projects.length; i += 1) {
          if (projects[i].synced) ++count;
        }
        $scope.syncedProjectsCount = count;
    };
  
    $scope.$watch('projects', $scope.countSyncedProjects, true);

    $scope.fetchProjects = function () {
      
    //   console.log("Will fetch projects ", $cookies.accessToken);

    //   var projectsRequest = $http({
    //     method: 'GET',
    //     url: 'https://api.github.com/users/' + 'eddflrs' + '/repos'
    //   });
     
    // projectsRequest.success(function (data) {
    //   console.log('success ', data);
    //   $scope.projects = data;
    // });
     
    // projectsRequest.error(function (data) {
    //   console.log('error ', data);
    // });
    };

  }])
  
app.controller('SyncingCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
      
      var SYNCED =   "Synced",
        ASK_SYNC =   "Click to Sync",
        NOT_SYNCED = "Not Synced";
        
      $scope.syncText = NOT_SYNCED;
      $scope.synced = false;
      
      var setSyncText = function () {
        $scope.syncText = $scope.synced ? SYNCED : NOT_SYNCED;
      };

      $scope.sync = function (evt) {
        
        $scope.synced = !$scope.synced;
        
        if (!$scope.synced) return;
        
        var btn = $(evt.target);
        btn.button("loading");

        $timeout(function () {
          btn.button("reset");
          setSyncText();
          console.log("Synced sync is ", $scope.synced);
        }, 2000);
      };
      
      $scope.toggleSyncText = (function () {
        var toggle = false;
        return function () {
          if ($scope.synced) return;
          $scope.syncText = toggle ? NOT_SYNCED : ASK_SYNC;
          toggle = !toggle;
        }
      }());
  }]);
  
  