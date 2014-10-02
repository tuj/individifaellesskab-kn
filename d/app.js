var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '25px';
  $scope.offsetX = '0px';
  $scope.offsetY = '0px';
  $scope.numberOfLinesPrChunk = 500;
  $scope.scrollTime = 500;
  $scope.initializing = true;
  $scope.sliding = false;
  $scope.whichList = "vi";

  $scope.lines = [];

  var theList = [];

  var startShow = function() {
    // Set top.
    $('.content').css("top", "768px");

    var newLines = [];

    var lastLine = "";
    for (var i = 0; i < $scope.numberOfLinesPrChunk; i++) {
      var newLine = null;
      do {
        newLine = theList[ Math.floor((Math.random() * theList.length))];
      } while (newLine == lastLine);

      newLines.push(newLine);

      lastLine = newLine;
    }

    $scope.$apply(function() {
      $scope.lines = newLines;
    });

    var height = $('.content').height();

    if (height == 0) {
      startShow();
      return;
    }

    // Start sliding
    $(".content").animate({top: "-" + height + "px"}, $scope.scrollTime * 1000, "linear", startShow);
  };

  // Start interval.
  $scope.start = function() {
    $scope.initializing = false;

    if ($scope.whichList == 'jeg') {
      theList = kulturnat.i;
    } else if ($scope.whichList == 'vi') {
      theList = kulturnat.we;
    }

    // Start the show.
    startShow();
  };
}]);
