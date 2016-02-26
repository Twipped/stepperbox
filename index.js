
module.exports = function (expected) {
	var steps = expected || [];
	var step = 0;

	var stub = function () {
		if (step > steps.length - 1) {
			var tooManyTimes = 'Stepper was called too many times. Offending arguments:';
			for( var argIndex in arguments) {
				tooManyTimes += '\n index: ' + argIndex + ' value: ' + arguments[argIndex];
			}
			throw new Error(tooManyTimes);
		}

		return steps[step++].apply(null, arguments);
	};

	stub.add = function (fn, count) {
	  count = count || 1;
	  for(var i = 0; i < count; i++) {
	    steps.push(fn);
	  }
		return stub;
	};

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
		} else if (newsteps === true) {
			steps = [];
		}
		return stub;
	};

	stub.as = function (name) {
		return stub.bind(null, name);
	};

	return stub;
};
