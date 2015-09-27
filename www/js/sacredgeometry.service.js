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

		var solutions = this.numbersToMatch(spellLevel);
		return this.getSolution(input, [], solutions, 0, input.length - 1);
	};

	this.getSolution = function (left, right, solutions, operands, maxOperands) {
		var expression;
		if (left.length == 1 || operands >= maxOperands) {
			expression = left.concat(right);
			var result = this.resolvePostfixExpression(expression);
			if (solutions.indexOf(result) >= 0) {
				return expression;
			} else {
				return null;
			}
		} else {

			right.push("+");
			expression = this.getSolution(left, right, solutions, operands + 1, maxOperands);
			if (expression != null)
				return expression;
			right.pop();

			right.push("-");
			expression = this.getSolution(left, right, solutions, operands + 1, maxOperands);
			if (expression != null)
				return expression;
			right.pop();

			right.push("*");
			expression = this.getSolution(left, right, solutions, operands + 1, maxOperands);
			if (expression != null)
				return expression;
			right.pop();

			right.push("/");
			expression = this.getSolution(left, right, solutions, operands + 1, maxOperands);
			if (expression != null)
				return expression;
			right.pop();
		}
		return null;
	};

	this.resolvePostfixExpression = function (input) {
		var resultStack = [];
		var token;
		for (var i = 0; i < input.length; i++) {
			token = input[i];
			if (this.isNumeric(token)) {
				resultStack.push(token);
			} else {
				var a = resultStack.pop();
				var b = resultStack.pop();
				if (token === "+") {
					resultStack.push(parseInt(a) + parseInt(b));
				} else if (token === "-") {
					resultStack.push(parseInt(b) - parseInt(a));
				} else if (token === "*") {
					resultStack.push(parseInt(a) * parseInt(b));
				} else if (token === "/") {
					if (parseInt(b) % parseInt(a) == 0)
						resultStack.push(parseInt(b) / parseInt(a));
					else
						return -1;
				} else if (token === "^") {
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