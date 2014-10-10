var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '40';
  $scope.offsetX = '0';
  $scope.offsetY = '0';
  $scope.scrollFactor = 1000;
  $scope.initializing = true;
  $scope.sliding = false;
  $scope.whichList = "vi";
  $scope.numberOfLinesPrChunk = 500;

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
        newLine = theList[Math.floor((Math.random() * theList.length))];
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
    $(".content").animate({top: "-" + height + "px"}, $scope.lines.length * $scope.scrollFactor, "linear", startShow);
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
