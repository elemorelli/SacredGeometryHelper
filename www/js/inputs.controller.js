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

		var postfixSolution = $scope.generatePostfixSolution(values);
		$scope.translateSolution(postfixSolution);
	};


	$scope.generatePostfixSolution = function (values) {
		return SacredGeometryService.generatePostfixSolution(values);
	};


	$scope.translateSolution = function (postfixSolution) {
		$scope.inputs.solution = SacredGeometryService.postfix2infix(postfixSolution);
	};

});