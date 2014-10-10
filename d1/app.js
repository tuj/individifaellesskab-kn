var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', '$timeout', function ($scope, $interval, $timeout) {
  $scope.fontsize = '40';
  $scope.offsetX = '0';
  $scope.offsetY = '0';
  $scope.scrollFactor = 1000;
  $scope.initializing = true;
  $scope.sliding = false;
  $scope.whichList = "vi";

  $scope.lines = [];

  var theList = [];

  var startShow = function() {
    // Set top.
    $('.content').css("top", "768px");

    var newLines = [];

    for (var i = 0; i < theList.length; i++) {
      newLines.push(theList[i]);
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
    } else if ($scope.whichList == 'jeg40') {
      theList = kulturnat.i40;
    } else if ($scope.whichList == 'vi40') {
      theList = kulturnat.we40;
    } else if ($scope.whichList == 'jeg50') {
      theList = kulturnat.i50;
    } else if ($scope.whichList == 'vi50') {
      theList = kulturnat.we50;
    }

    // Start the show.
    startShow();
  };
}]);
