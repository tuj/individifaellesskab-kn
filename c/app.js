var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '25px';
  $scope.offsetX = '0px';
  $scope.offsetY = '0px';
  $scope.initializing = true;

  $scope.lines = [];
  $scope.showLine = 0;
  
  var fadeTime = 2000;
  var rotationTime = 2000;
    
  var startShow = function() {
    var oldLine = $scope.showLine;
    $scope.showLine = ($scope.showLine + 1) % 2;

    $timeout(function() {
      var i = Math.floor((Math.random() * kulturnat.i.length));
      $scope.lines[oldLine] = kulturnat.i[i];
    }, fadeTime / 2);
  };

  // Start interval.
  $scope.start = function() {
    $scope.initializing = false;

    $interval(function() {
      startShow();
    }, fadeTime * 2 + rotationTime);
  };
}]);
