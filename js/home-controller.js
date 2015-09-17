(function(){
	var app = angular.module('controllers', []);
	app.controller('HomeCtrl', ['$scope', '$log', '$window', '$document', function($scope, $log, $window, $document) {
		$log.log('Home Controller Called!!');
		var hiddenDivContainer = document.getElementById('hiddenDivContainer');
		if(hiddenDivContainer.childNodes.length > 0) {
			var timer = 0;
			_.every(hiddenDivContainer.children, function(el, i) {
				if(el.className === 'hidden') {
					setTimeout(_.bind(function(){
						el.className = 'text-line line-' + i;
					}, this), timer);
					var nextLineStartTime = el.getAttribute('data-next-line-start-time');
					if(nextLineStartTime === '') return false;
					timer += Number(nextLineStartTime);
					return true;
				}
			}, this);
		}
	}]);
}());