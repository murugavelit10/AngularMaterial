(function(){
	var app = angular.module('AngularMaterial', ['ngRoute', 'ngMaterial', 'controllers']);
	app.config(['$routeProvider', function($routeProvider){
		$routeProvider.
		when('/', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);
}());