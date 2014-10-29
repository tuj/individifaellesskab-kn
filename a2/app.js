var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '40';
  $scope.offsetX = '0';
  $scope.offsetY = '0';
  $scope.initializing = true;
  $scope.numberOfLines = 10;
  $scope.whichList = "vi";

  $scope.lines = [];
  $scope.lines[0] = [];
  $scope.lines[1] = [];
  $scope.lineIndex = 1;

  $scope.lineColor = "#fff";

  $scope.time = 20000;
  var fadeTime = 2000;

  var theList = [];

  var startShow = function() {
    var nextLineIndex = $scope.lineIndex;

    $scope.lineIndex = ($scope.lineIndex + 1) % 2;

    $timeout(function() {
      $scope.lines[nextLineIndex] = [];

      // Update next lines.
      while ($scope.lines[nextLineIndex].length < $scope.numberOfLines) {
        var i = Math.floor((Math.random() * theList.length));
        
        if ($scope.lines[nextLineIndex].indexOf(theList[i]) < 0) {
          $scope.lines[nextLineIndex].push(theList[i]);
        }
      }
    }, fadeTime);
  };

  // Start interval.
  $scope.start = function() {
    if ($scope.whichList == 'jeg') {
      theList = kulturnat.i;
    } else if ($scope.whichList == 'vi') {
      theList = kulturnat.we;
    } else if ($scope.whichList == 'jeg40') {
      theList = kulturnat.i40;
    } else if ($scope.whichList == 'vi40') {
      theList = kulturnat.we40;
    } else if ($scope.whichList == 'jeg50') {
      theList = kulturnat.i50;
    } else if ($scope.whichList == 'vi50') {
      theList = kulturnat.we50;
    }

    // Setup first array.
    while ($scope.lines[0].length < $scope.numberOfLines) {
      var i = Math.floor((Math.random() * theList.length));

      if ($scope.lines[0].indexOf(theList[i]) < 0) {
        $scope.lines[0].push(theList[i]);
      }
    }
    // Setup second array.
    while ($scope.lines[1].length < $scope.numberOfLines) {
      var i = Math.floor((Math.random() * theList.length));

      if ($scope.lines[1].indexOf(theList[i]) < 0) {
        $scope.lines[1].push(theList[i]);
      }
    }

    $scope.initializing = false;

    $interval(function() {
      startShow();
    }, $scope.time);
  };
}]);
