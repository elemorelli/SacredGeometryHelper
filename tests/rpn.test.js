describe('RPNTests', function () {

	var scope;

	beforeEach(module('SacredGeometry'));

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('InputsController', {$scope: scope});
	}));

	it('should translate a postfix solution to infix correctly', function () {

		scope.translateSolution(["1", "2", "+"]);
		expect(scope.inputs.solution).toEqual("1+2");

		scope.translateSolution(["3", "4", "-"]);
		expect(scope.inputs.solution).toEqual("3-4");

		scope.translateSolution(["5", "6", "*"]);
		expect(scope.inputs.solution).toEqual("5*6");

		scope.translateSolution(["7", "8", "/"]);
		expect(scope.inputs.solution).toEqual("7/8");

		scope.translateSolution(["5", "7", "2", "-", "*"]);
		expect(scope.inputs.solution).toEqual("5*(7-2)");

		scope.translateSolution(["3", "1", "-", "4", "5", "*", "*"]);
		expect(scope.inputs.solution).toEqual("(3-1)*4*5");

		scope.translateSolution(["3", "2", "1", "+", "+"]);
		expect(scope.inputs.solution).toEqual("3+2+1");
		expect(eval(scope.inputs.solution)).toEqual(6);

		scope.translateSolution(["3", "2", "1", "-", "+"]);
		expect(scope.inputs.solution).toEqual("3+2-1");
		expect(eval(scope.inputs.solution)).toEqual(4);

		scope.translateSolution(["3", "2", "+", "1", "+"]);
		expect(scope.inputs.solution).toEqual("3+2+1");
		expect(eval(scope.inputs.solution)).toEqual(6);

		scope.translateSolution(["3", "2", "-", "1", "+"]);
		expect(scope.inputs.solution).toEqual("3-2+1");
		expect(eval(scope.inputs.solution)).toEqual(2);

		scope.translateSolution(["3", "2", "1", "+", "-"]);
		expect(scope.inputs.solution).toEqual("3-(2+1)");
		expect(eval(scope.inputs.solution)).toEqual(0);

		scope.translateSolution(["3", "2", "1", "-", "-"]);
		expect(scope.inputs.solution).toEqual("3-(2-1)");
		expect(eval(scope.inputs.solution)).toEqual(2);

		scope.translateSolution(["3", "2", "+", "1", "-"]);
		expect(scope.inputs.solution).toEqual("(3+2)-1");
		expect(eval(scope.inputs.solution)).toEqual(4);

		scope.translateSolution(["3", "2", "-", "1", "-"]);
		expect(scope.inputs.solution).toEqual("(3-2)-1");
		expect(eval(scope.inputs.solution)).toEqual(0);

	});

	it('should generate a correct solution', function () {
		//var solution = scope.generatePostfixSolution(["1", "2", "+"]);
		//expect(solution).toEqual(["3", "2", "+", "1", "-"]);
	});


	it('should perform operations correctly on rpn1', function () {
		expect(scope.rpn1(["3", "2", "1", "+", "+"])).toEqual(6);
		expect(scope.rpn1(["3", "2", "1", "-", "+"])).toEqual(4);
		expect(scope.rpn1(["3", "2", "+", "1", "+"])).toEqual(6);
		expect(scope.rpn1(["3", "2", "-", "1", "+"])).toEqual(2);
		expect(scope.rpn1(["3", "2", "1", "+", "-"])).toEqual(0);
		expect(scope.rpn1(["3", "2", "1", "-", "-"])).toEqual(2);
		expect(scope.rpn1(["3", "2", "+", "1", "-"])).toEqual(4);
		expect(scope.rpn1(["3", "2", "-", "1", "-"])).toEqual(0);
	});

	it('should perform operations correctly on rpn2', function () {
		expect(scope.rpn2(["3", "2", "1", "+", "+"])).toEqual("6");
		expect(scope.rpn2(["3", "2", "1", "-", "+"])).toEqual("4");
		expect(scope.rpn2(["3", "2", "+", "1", "+"])).toEqual("6");
		expect(scope.rpn2(["3", "2", "-", "1", "+"])).toEqual("2");
		expect(scope.rpn2(["3", "2", "1", "+", "-"])).toEqual("0");
		expect(scope.rpn2(["3", "2", "1", "-", "-"])).toEqual("2");
		expect(scope.rpn2(["3", "2", "+", "1", "-"])).toEqual("4");
		expect(scope.rpn2(["3", "2", "-", "1", "-"])).toEqual("0");
	});

});