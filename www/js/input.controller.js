angular.module('SacredGeometry').controller('InputController', function ($scope, $ionicLoading, $timeout, SacredGeometryService) {

	$scope.inputs = {};

	$scope.inputs.engineeringRanks = localStorage.getItem('engineeringRanks') || 2;

	$scope.inputs.spellLevel = localStorage.getItem('spellLevel') || 1;

	//$scope.inputs.dice = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	$scope.inputs.dice = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

	$scope.inputs.numbersToMatch = "";

	$scope.inputs.solution = "";

	$scope.updateNumbersToMatch = function () {
		$scope.inputs.numbersToMatch = SacredGeometryService.primeNumbers[$scope.inputs.spellLevel];
	};

	$scope.updateNumbersToMatch();

	$scope.random = function () {
		for (var i = 0; i < $scope.inputs.dice.length; i++) {
			$scope.inputs.dice[i] = Math.floor(Math.random() * (6 - 1) + 1);
		}
	};

	$scope.solve = function () {

		localStorage.setItem('engineeringRanks', $scope.inputs.engineeringRanks);
		localStorage.setItem('spellLevel', $scope.inputs.spellLevel);

		var values = [];
		for (var i = 0; i < $scope.inputs.dice.length && i < $scope.inputs.engineeringRanks; i++) {
			values.push("" + $scope.inputs.dice[i]);
		}
		values.sort();
		values.reverse();

		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: false,
			showDelay: 0
		});

		$timeout(function () {
			var start = performance.now();
			var postfixSolution = $scope.generatePostfixSolution(values, $scope.inputs.spellLevel);
			var end = performance.now();
			console.log("Execution time: " + (end - start) + " ms");
			$ionicLoading.hide();

			if (postfixSolution != null) {
				var result = SacredGeometryService.resolvePostfixExpression(postfixSolution);
				$scope.inputs.solution = $scope.translateSolution(postfixSolution) + " = " + result;
			} else {
				$scope.inputs.solution = "No solution found";
			}
		}, 500);


	};

	$scope.generatePostfixSolution = function (values, spellLevel) {
		return SacredGeometryService.generatePostfixSolution(values, spellLevel);
	};

	$scope.translateSolution = function (postfixSolution) {
		return SacredGeometryService.postfix2infix(postfixSolution);
	};

});