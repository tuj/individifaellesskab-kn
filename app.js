var app = angular.module('app', ['ngAnimate']);

app.controller('IndexController', ['$scope', '$interval', function ($scope, $interval) {
  $scope.i = kulturnat.i;
  $scope.we = kulturnat.we;
  
  $scope.iIndexes = [];
  $scope.showI = function(i) {
    return $scope.iIndexes.indexOf(i) >= 0;
  }
  
  $scope.weIndexes = [];
  $scope.showWe = function(i) {
    return $scope.weIndexes.indexOf(i) >= 0;
  }
  
  $interval(function() {
    $scope.iIndexes = [];
    $scope.weIndexes = [];
  
	while ($scope.iIndexes.length < 5) {
		var i = Math.floor((Math.random() * kulturnat.i.length));
		if ($scope.iIndexes.indexOf(i) < 0) {
			$scope.iIndexes.push(i);
		}
	}
	while ($scope.weIndexes.length < 5) {
		var i = Math.floor((Math.random() * kulturnat.we.length));
		if ($scope.weIndexes.indexOf(i) < 0) {
			$scope.weIndexes.push(i);
		}
	}
	
    }, 5000);
}]);