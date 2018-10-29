
module.exports = function (expected) {
	var steps = expected || [];
	var step = 0;
	var done = [];

	var stub = function () {
		if (step > steps.length - 1) {
			step++;
			var tooManyTimes = 'Stepper was called too many times. Offending arguments:';
			for( var argIndex in arguments) {
				tooManyTimes += '\n index: ' + argIndex + ' value: ' + arguments[argIndex];
			}
			throw new Error(tooManyTimes);
		}

		var result = steps[step++].apply(null, arguments);

		if (step == steps.length) done.forEach((fn) => fn());

		return result;
	};

	stub.add = function (fn, count) {
		count = count || 1;
		for(var i = 0; i < count; i++) {
			steps.push(fn);
		}
		return stub;
	};

	stub.onDone = function (fn) {
		done.push(fn);
	}

	stub.onCall = function (i, fn) {
		steps[i] = fn;
		return stub;
	};

	stub.onFirstCall = function (fn) {
		return stub.onCall(0, fn);
	};

	stub.onSecondCall = function (fn) {
		return stub.onCall(1, fn);
	};

	stub.onThirdCall = function (fn) {
		return stub.onCall(2, fn);
	};

	stub.reset = function (newsteps) {
		step = 0;
		if (Array.isArray(newsteps)) {
			steps = newsteps;
			done = [];
		} else if (newsteps === true) {
			steps = [];
			done = [];
		}
		return stub;
	};

	stub.as = function (name) {
		return stub.bind(null, name);
	};

	stub.getStep = function () {
		return step;
	};

	stub.getCount = function () {
		return steps.length;
	}

	return stub;
};
