



angular.module('myApp.services', [])
  
  .factory('Projects', function () {
    var projects = [
      {name: "Foobar", http_url: "http://github.com", synced: false},  
      {name: "Barfoo", http_url: "http://github.com", synced: false},  
      {name: "Bazbar", http_url: "http://github.com", synced: false}
    ];
    
    return projects;

  });