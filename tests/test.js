
var test = require('tap').test;
var stepperbox = require('../index');

test('stepperbox - simple adds', function (t) {
	t.plan(3);

	var stepper = stepperbox();
	stepper.add(function (value) {
		t.equal(value, 1, 'step 1');
	});

	stepper.add(function (value) {
		t.equal(value, 2, 'step 2');
	});

	stepper.add(function (value) {
		t.equal(value, 3, 'step 3');
	});

	stepper(1);
	stepper(2);
	stepper(3);

	t.end();
});

test('stepperbox - explicit adds', function (t) {
	// No sane person would do this, but just in case they do, lets make sure it works
	t.plan(4);

	var stepper = stepperbox();
	stepper.onThirdCall(function (value) {
		t.equal(value, 3, 'step 3');
	});

	stepper.onFirstCall(function (value) {
		t.equal(value, 1, 'step 1');
	});

	stepper.onCall(3, function (value) {
		t.equal(value, 4, 'step 4');
	})

	stepper.onSecondCall(function (value) {
		t.equal(value, 2, 'step 2');
	});

	stepper(1);
	stepper(2);
	stepper(3);
	stepper(4);

	t.end();
});


test('stepperbox - initialized with functions', function (t) {
	t.plan(3);

	var stepper = stepperbox([
		function (value) {
			t.equal(value, 1, 'step 1');
		},
		function (value) {
			t.equal(value, 2, 'step 2');
		}
	]);

	stepper.add(function (value) {
		t.equal(value, 3, 'step 3');
	});

	stepper(1);
	stepper(2);
	stepper(3);

	t.end();
});

test('stepperbox - add with multiplier', function (t) {
	t.plan(3);

	var stepper = stepperbox();

	var i = 0;
	stepper.add(function (value) {
		t.equal(++i, value, 'steps');
	}, 2);

	stepper.add(function (value) {
		t.equal(value, 3, 'step 2');
	});

	stepper(1);
	stepper(2);
	stepper(3);

	t.end();
});

test('stepperbox - reset step', function (t) {
	t.plan(3);

	var stepper = stepperbox();
	stepper.add(function (value) {
		t.equal(value, 1, 'step 1');
	});

	stepper.add(function (value) {
		t.equal(value, 2, 'step 2');
	});

	stepper(1);
	stepper.reset();
	stepper(1);
	stepper(2);

	t.end();
});

test('stepperbox - reset step', function (t) {
	t.plan(3);

	var stepper = stepperbox();
	stepper.add(function (value) {
		t.equal(value, 1, 'step 1');
	});

	stepper.add(function (value) {
		t.equal(value, 2, 'step 2');
	});

	stepper(1);
	stepper.reset();
	stepper(1);
	stepper(2);

	t.end();
});

test('stepperbox - reset all', function (t) {
	t.plan(2);

	var stepper = stepperbox();
	stepper.add(function (value) {
		t.equal(value, 1, 'step 1');
	});

	stepper(1);
	stepper.reset(true);

	stepper.add(function (value) {
		t.equal(value, 2, 'step 2');
	});

	stepper(2);

	t.end();
});

test('stepperbox - reset with array', function (t) {
	t.plan(2);

	var stepper = stepperbox();
	stepper.add(function (value) {
		t.equal(value, 1, 'step 1');
	});

	stepper(1);
	stepper.reset([
		function (value) {
			t.equal(value, 2, 'step 2');
		}
	]);

	stepper(2);

	t.end();
});

test('stepperbox - throws when called too much', function (t) {
	t.plan(2);

	var stepper = stepperbox();
	stepper.add(function (value) {
		t.equal(value, 1, 'step 1');
	});

	stepper(1);
	t.throws(function () {
		stepper(2);
	}, {message: 'Stepper was called too many times. Offending arguments:\n index: 0 value: 2'});

	t.end();
});


test('stepperbox - as', function (t) {
	t.plan(3);

	var stepper = stepperbox();
	stepper.add(function (as, value) {
		t.equal(as, 'someFunction');
		t.equal(value, 1, 'step 1');
	});

	stepper.add(function (value) {
		t.equal(value, 2, 'step 2');
	});

	var stub = stepper.as('someFunction');
	stub(1);
	stepper(2);

	t.end();
});