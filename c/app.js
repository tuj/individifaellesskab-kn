var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '25px';
  $scope.offsetX = '0px';
  $scope.offsetY = '0px';
  $scope.initializing = true;

  $scope.line1 = "";
  $scope.line2 = "";
  $scope.showLine = 0;
  
  var fadeTime = 500;
    
  var startShow = function() {
	$scope.showLine = ($scope.showLine + 1) % 2;

    $timeout(function() {
      var i = Math.floor((Math.random() * kulturnat.i.length));
      $scope.lines[nextLineIndex].push(kulturnat.i[i]);
    }, fadeTime);
  };

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
