angular.module('SacredGeometry').service('SacredGeometryService', function () {

	this.primeNumbers = {
		1: [3, 5, 7],
		2: [11, 13, 17],
		3: [19, 23, 29],
		4: [31, 37, 41],
		5: [43, 47, 53],
		6: [59, 61, 67],
		7: [71, 73, 79],
		8: [83, 89, 97],
		9: [101, 103, 107]
	};

	this.numbersToMatch = function (spellLevel) {
		return this.primeNumbers[spellLevel];
	};

	this.isNumeric = function (string) {
		return !isNaN(string);
	};

	this.hasLowerPrecedent = function (expression) {
		return expression.indexOf("+") > 0 || expression.indexOf("-") > 0
	};

	this.postfix2infix = function (input) {

		var infix = [];
		var rightTerm = "";
		var leftTerm = "";

		for (var i = 0; i < input.length; i++) {
			var token = input[i];
			if (token == "+") {

				rightTerm = infix.pop();
				leftTerm = infix.pop();
				infix.push(leftTerm + token + rightTerm);

			} else if (token == "*" || token == "/" || token == "-") {

				rightTerm = infix.pop();
				if (this.hasLowerPrecedent(rightTerm)) {
					rightTerm = "(" + rightTerm + ")";
				}

				leftTerm = infix.pop();
				if (this.hasLowerPrecedent(leftTerm)) {
					leftTerm = "(" + leftTerm + ")";
				}

				infix.push(leftTerm + token + rightTerm);

			} else if (this.isNumeric(token)) {

				infix.push(token);

			}
		}

		return infix.toString();
	};

	this.generatePostfixSolution = function (input, spellLevel) {

		input = ["1", "2", "3"];
		var solutions = this.numbersToMatch(spellLevel);

		input.push("+");
		input.push("-");

		return input;
	};

	this.rpn1 = function (input) {
		var resultStack = [];
		var token;
		while (token = input.shift()) {
			if (token == +token) {
				resultStack.push(token);
			} else {
				var n2 = resultStack.pop(), n1 = resultStack.pop();
				var re = /^[\+\-\/\*]$/;
				if (n1 != +n1 || n2 != +n2 || !re.test(token)) {
					throw new Error('Invalid expression: ' + input);
				}
				resultStack.push(eval(n1 + token + ' ' + n2));
			}
		}
		if (resultStack.length !== 1) {
			throw new Error('Invalid expression: ' + input);
		}
		return resultStack.pop();
	};

	this.rpn2 = function (input) {
		var resultStack = [];
		for (var i = 0; i < input.length; i++) {
			if (this.isNumeric(input[i])) {
				resultStack.push(input[i]);
			} else {
				var a = resultStack.pop();
				var b = resultStack.pop();
				if (input[i] === "+") {
					resultStack.push(parseInt(a) + parseInt(b));
				} else if (input[i] === "-") {
					resultStack.push(parseInt(b) - parseInt(a));
				} else if (input[i] === "*") {
					resultStack.push(parseInt(a) * parseInt(b));
				} else if (input[i] === "/") {
					resultStack.push(parseInt(b) / parseInt(a));
				} else if (input[i] === "^") {
					resultStack.push(Math.pow(parseInt(b), parseInt(a)));
				}
			}
		}
		if (resultStack.length !== 1) {
			throw new Error('Invalid expression: ' + input);
		}
		return resultStack.pop();
	};

});