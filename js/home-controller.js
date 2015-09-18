(function(){
	var app = angular.module('controllers', []);
	app.controller('HomeCtrl', ['$scope', '$log', '$window', '$document', function($scope, $log, $window, $document) {
		debugger;
		var width, height, realWidth, realHeight, screenRatio, balloonsArray = ['blue-balloon', 'green-balloon', 'orange-balloon', 'pink-balloon', 'red-balloon', 'yellow-balloon'];
		function prepareScreenParams () {
			width = screen.height,
				height = screen.width;
			if (width > height) {
				realWidth = width;
				realHeight = height;
				screenRatio = (height / width);
			} else {
				realWidth = height;
				realHeight = width;
				screenRatio = (width / height);
			}
			if (isNaN(screenRatio)) {
				if (window.innerHeight > window.innerWidth) {
					realWidth = window.innerHeight;
					realHeight = window.innerWidth;
					screenRatio = (window.innerWidth / window.innerHeight);
				} else {
					realWidth = window.innerWidth;
					realHeight = window.innerHeight;
					screenRatio = (window.innerHeight / window.innerWidth);
				}
			}
		}
		prepareScreenParams();
		angular.element($window).bind('resize', prepareScreenParams);
		/*generateBalloons(26);*/
		var hiddenDivContainer = document.getElementById('hiddenDivContainer');
		if(hiddenDivContainer.childNodes.length > 0) {
			var timer = 0;
			_.every(hiddenDivContainer.children, function(el, i) {
				if(el.className === 'hidden') {
					setTimeout(_.bind(function(){
						el.className = 'text-line line-' + i;
						if(i === hiddenDivContainer.children.length - 1) {
							initAutoBgAnim();
						}
					}, this), timer);
					var nextLineStartTime = el.getAttribute('data-next-line-start-time');
					timer += Number(nextLineStartTime);
					return true;
				}
			}, this);
		}
		
		function newGradient() {
			var c1 = {
				r: Math.floor(Math.random()*255),
				g: Math.floor(Math.random()*255),
				b: Math.floor(Math.random()*255)
			};
			var c2 = {
				r: Math.floor(Math.random()*255),
				g: Math.floor(Math.random()*255),
				b: Math.floor(Math.random()*255)
			};
			c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
			c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
			return 'radial-gradient(at top left, '+c1.rgb+', '+c2.rgb+')';
		}

		function rollBg() {
			$window.document.getElementsByClassName('bg bg-hidden ng-scope')[0].style.background = newGradient();
			_.each($window.document.getElementsByClassName('bg'), function(el, i) {
				el.className = el.classList.length > 2 ? 'bg ng-scope' : 'bg bg-hidden ng-scope';
			});
		}
		function initAutoBgAnim() {
			setInterval(rollBg, 5000);
		}
		
		function generateBalloons (balloonCount) {
			for(var i = 0; i < balloonCount; i++) {
				var selectedBalloon = _.random(0, balloonsArray.length - 1);
				var el = $window.document.getElementById(balloonsArray[selectedBalloon]);
				var balloon = $window.document.createElementNS("http://www.w3.org/2000/svg", "svg");
				balloon.setAttribute('id', 'baloon-' + i);
				balloon.setAttribute('width', '150');
				balloon.setAttribute('height', '400');
				balloon.setAttribute('class', 'balloonSvg');
				balloon.innerHTML = el.innerHTML;
				var gElem = balloon.getElementsByTagName('g')[0];
				gElem.setAttribute('transform', 'rotate('+ _.random(0, realWidth) + ' ' + _.random(0, realWidth) + ', ' + _.random(0, 360) + ')');
				$window.document.getElementById('balloons-container').appendChild(balloon);
			}
			bindClickEventsToBalloons();
		}
		
		function bindClickEventsToBalloons () {
			var balloons = $window.document.getElementById('balloons-container').querySelectorAll('svg');
			for(var i = 0; i < balloons.length; i++) {
				balloons[i].addEventListener('click', function(evt){
					console.log('evt:', evt);
					evt.srcElement.className = 'fadeOutAnim';
				});
			}
		}
	}]);
}());