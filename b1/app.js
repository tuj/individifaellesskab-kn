var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '40';
  $scope.offsetX = '0';
  $scope.offsetY = '0';
  $scope.initializing = true;
  $scope.numberOfLines = 10;
  $scope.whichList = 'vi';
  $scope.currentIndex = 0;

  $scope.lines = [];
  $scope.lines[0] = [];
  $scope.lines[1] = [];
  $scope.lineIndex = 0;

  $scope.colors = [
	 "red", "lawngreen", "aqua", "yellow", "fuchsia", "yellowgreen", "orange"
  ];
  $scope.colorIndex = 0;
  
  $scope.highligtingInterval = undefined;
  $scope.highlightIndex = 0;
  $scope.nonHighlightColor = "#aaa";

  $scope.highlightTime = 2000;

  var fadeTime = 2000;

  var theList;

  $scope.getColorClass = function() {
	return $scope.colors[$scope.colorIndex];
  };
  
  var startHighlighting = function() {
    $scope.highlightIndex = 0;

    $scope.highligtingInterval = $interval(function() {
	  $scope.colorIndex = Math.floor((Math.random() * $scope.colors.length));
      $scope.highlightIndex = $scope.highlightIndex + 1;
    }, $scope.highlightTime);
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
    }, fadeTime + $scope.highlightTime * $scope.numberOfLines);
  };
}]);
