var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '50';
  $scope.offsetX = '0';
  $scope.offsetY = '0';
  $scope.initializing = true;
  $scope.whichList = "vi";

  $scope.lines = [];
  $scope.showLine = 0;
  
  var fadeTime = 2500;
  var rotationTime = 3000;

  var theList;

  var startShow = function() {
    var oldLine = $scope.showLine;
    $scope.showLine = ($scope.showLine + 1) % 2;

    $timeout(function() {
      var i = Math.floor((Math.random() * theList.length));
      $scope.lines[oldLine] = theList[i];
    }, fadeTime / 2);
  };

  // Start interval.
  $scope.start = function() {
    if ($scope.whichList == 'jeg') {
      theList = kulturnat.i;
    } else if ($scope.whichList == 'vi') {
      theList = kulturnat.we;
    }
    $scope.lines[0] = theList[ Math.floor((Math.random() * theList.length))];
    $scope.lines[1] = theList[ Math.floor((Math.random() * theList.length))];

    $scope.initializing = false;

    $interval(function() {
      startShow();
    }, fadeTime + rotationTime);
  };
}]);
