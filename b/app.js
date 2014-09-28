var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '25px';
  $scope.offsetX = '0px';
  $scope.offsetY = '0px';
  $scope.initializing = true;
  $scope.numberOfLines = 10;

  $scope.lines = [];
  $scope.lines[0] = [];
  $scope.lines[1] = [];
  $scope.lineIndex = 1;

  $scope.colors = [
	 "red", "lawngreen", "aqua", "yellow", "fuchsia", "yellowgreen", "orange"
  ];
  $scope.colorIndex = 0;
  
  $scope.highligtingInterval = undefined;
  $scope.highlightIndex = 0;

  var highlightTime = 3500;
  var fadeTime = 2000;

  $scope.getColorClass = function() {
	return $scope.colors[$scope.colorIndex];
  };
  
  var startHighlighting = function() {
    $scope.highlightIndex = 0;

    $scope.highligtingInterval = $interval(function() {
	  $scope.colorIndex = Math.floor((Math.random() * $scope.colors.length));
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
        var i = Math.floor((Math.random() * kulturnat.i.length));
        
        if ($scope.lines[nextLineIndex].indexOf(kulturnat.i[i]) < 0) {
          $scope.lines[nextLineIndex].push(kulturnat.i[i]);
        }
      }
    }, fadeTime);
  };

  // Setup first array.
  while ($scope.lines[0].length < $scope.numberOfLines) {
    var i = Math.floor((Math.random() * kulturnat.i.length));
    
    if ($scope.lines[0].indexOf(kulturnat.i[i]) < 0) {
      $scope.lines[0].push(kulturnat.i[i]);
    }
  }
  // Setup second array.
  while ($scope.lines[1].length < $scope.numberOfLines) {
    var i = Math.floor((Math.random() * kulturnat.i.length));
    
    if ($scope.lines[1].indexOf(kulturnat.i[i]) < 0) {
      $scope.lines[1].push(kulturnat.i[i]);
    }
  }

  // Start interval.
  $scope.start = function() {
    $scope.initializing = false;

    // Start highlighting
    $timeout(startHighlighting, fadeTime);

    $interval(function() {
      startShow();
    }, fadeTime + highlightTime * $scope.numberOfLines);
  };
}]);
