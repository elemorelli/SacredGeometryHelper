angular.module('SacredGeometry').directive('diceDigit', function () {
	return {
		require: '?ngModel',
		restrict: "A",
		link: function (scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			element.bind('keypress', function (event) {

				if (event.keyCode >= 49 && event.keyCode <= 57) {
					this.value = "";
				} else if (event.keyCode >= 32) {
					event.preventDefault();
				} else {
					return false;
				}
			});
		}
	};
}).directive('focusMe', function ($timeout) {
	return {
		link: function (scope, element, attrs) {

			$timeout(function () {
				element[0].focus();
			}, 750);
		}
	};
});