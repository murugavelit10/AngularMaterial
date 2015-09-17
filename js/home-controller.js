(function(){
	var app = angular.module('controllers', []);
	app.controller('HomeCtrl', ['$scope', '$log', '$window', '$document', function($scope, $log, $window, $document) {
		$log.log('Home Controller Called!!');
	}]);
}());