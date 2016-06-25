'use strict';
angular.module('app.links', []).controller('linksCtrl', [
  '$scope', '$window', '$location', '$rootScope', '$route', function($scope, $window, $location, $rootScope, $route) {
    $scope.switchMap = function(mapType) {
      console.log('switch maps', mapType);
      localStorage.setItem('mapPreference', mapType);
      $window.location.reload();
    };
  }
]);
