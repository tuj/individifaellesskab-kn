var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.lines = [];
  $scope.lines[0] = [];
  $scope.lines[1] = [];
  $scope.lineIndex = 1;

  $scope.highligtingInterval = undefined;
  $scope.highlightIndex = 0;

  var startHighlighting = function() {
    $scope.highlightIndex = 0;

    $scope.highligtingInterval = $interval(function() {
      $scope.highlightIndex = $scope.highlightIndex + 1;
    }, 6000);
  };

  var stopHightlighting = function() {
    $scope.highlightIndex = 10;
    if (angular.isDefined($scope.highligtingInterval)) {
      $interval.cancel($scope.highligtingInterval);
      $scope.highligtingInterval = undefined;
    }
  };

  var startShow = function() {
    stopHightlighting();

    var nextLineIndex = $scope.lineIndex;

    $scope.lineIndex = ($scope.lineIndex + 1) % 2;

    $scope.lines[nextLineIndex] = [];

    // Update next lines.
    while ($scope.lines[nextLineIndex].length < 5) {
      var i = Math.floor((Math.random() * kulturnat.i.length));
      
      if ($scope.lines[nextLineIndex].indexOf(kulturnat.i[i]) < 0) {
        $scope.lines[nextLineIndex].push(kulturnat.i[i]);
      }
    }

    $timeout(startHighlighting, 500);
  };

  // Setup first array.
  while ($scope.lines[0].length < 5) {
    var i = Math.floor((Math.random() * kulturnat.i.length));
    
    if ($scope.lines[0].indexOf(kulturnat.i[i]) < 0) {
      $scope.lines[0].push(kulturnat.i[i]);
    }
  }
  // Setup second array.
  while ($scope.lines[1].length < 5) {
    var i = Math.floor((Math.random() * kulturnat.i.length));
    
    if ($scope.lines[1].indexOf(kulturnat.i[i]) < 0) {
      $scope.lines[1].push(kulturnat.i[i]);
    }
  }

  // Start highlighting
  $timeout(startHighlighting, 500);

  // Start interval.
  $interval(function() {
    startShow();
  }, 30500);
}]);
