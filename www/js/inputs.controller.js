angular.module('SacredGeometry').controller('InputsController', function ($scope, SacredGeometryService) {

	$scope.inputs = {};

	$scope.inputs.engineeringRanks = 2;

	$scope.inputs.spellLevel = 1;

	$scope.inputs.dice = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
		var values = [];
		for (var i = 0; i < $scope.inputs.dice.length && i < $scope.inputs.engineeringRanks; i++) {
			values.push("" + $scope.inputs.dice[i]);
		}

		var postfixSolution = $scope.generatePostfixSolution(values, $scope.inputs.spellLevel);

		if (postfixSolution != null) {
			var result = SacredGeometryService.rpn2(postfixSolution);
			$scope.inputs.solution = $scope.translateSolution(postfixSolution) + " = " + result;
		} else {
			$scope.inputs.solution = "No solution found";
		}
	};

	$scope.generatePostfixSolution = function (values, spellLevel) {
		return SacredGeometryService.generatePostfixSolution(values, spellLevel);
	};

	$scope.translateSolution = function (postfixSolution) {
		return SacredGeometryService.postfix2infix(postfixSolution);
	};

});