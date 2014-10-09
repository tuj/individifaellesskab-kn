var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '25px';
  $scope.offsetX = '0px';
  $scope.offsetY = '0px';
  $scope.initializing = true;
  $scope.numberOfLines = 10;
  $scope.whichList = "vi";
  $scope.currentIndex = 0;

  $scope.lines = [];
  $scope.lines[0] = [];
  $scope.lines[1] = [];
  $scope.lineIndex = 0;

  $scope.highligtingInterval = undefined;
  $scope.highlightIndex = 0;

  var highlightTime = 3500;
  var fadeTime = 2000;

  var theList = [];

  var startHighlighting = function() {
    $scope.highlightIndex = 0;

    $scope.highligtingInterval = $interval(function() {
      $scope.highlightIndex = $scope.highlightIndex + 1;
    }, highlightTime);
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

    $timeout(function() {
      startHighlighting();
      $scope.lines[nextLineIndex] = [];

      // Update next lines.
      while ($scope.lines[nextLineIndex].length < $scope.numberOfLines) {
        $scope.lines[nextLineIndex].push(theList[$scope.currentIndex]);

        $scope.currentIndex = ($scope.currentIndex + 1) % theList.length;
      }
    }, fadeTime);
  };

  // Start interval.
  $scope.start = function() {
    if ($scope.whichList == 'jeg') {
      theList = kulturnat.i;
    } else if ($scope.whichList == 'vi') {
      theList = kulturnat.we;
    }

    // Setup first array.
    while ($scope.lines[0].length < $scope.numberOfLines) {
      $scope.lines[0].push(theList[$scope.currentIndex]);

      $scope.currentIndex = ($scope.currentIndex + 1) % theList.length;
    }
    // Setup second array.
    while ($scope.lines[1].length < $scope.numberOfLines) {
      $scope.lines[1].push(theList[$scope.currentIndex]);

      $scope.currentIndex = ($scope.currentIndex + 1) % theList.length;
    }

    $scope.initializing = false;

    // Start highlighting
    $timeout(startHighlighting, fadeTime);

    $interval(function() {
      startShow();
    }, fadeTime + highlightTime * $scope.numberOfLines);
  };
}]);
