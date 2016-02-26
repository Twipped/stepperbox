Stepperbox
==================

[![Build Status](https://travis-ci.org/ChiperSoft/stepperbox.svg?branch=master)](https://travis-ci.org/ChiperSoft/stepperbox)

```
npm install --save-dev stepperbox
```

StepperBox is a testing library for creating stub functions that invoke different callbacks at different steps. It works similarly to a Sinon spy, but is much simpler in its implementation and usage.  This allows you to create much more explicit mock behavior without knowing any cryptic API.

### Example
```js
var stepperbox    = require('stepperbox');
var stepper = stepperbox();

stepper.add(function (input) {
  console.log('step 1', input);
});
stepper.add(function (input) {
  console.log('step 2', input);
});

stepper(5);
stepper(6);

// Outputs:
// "Step 1", 5
// "Step 2", 6
```

This can be further extended for testing by using `Function.prototype.bind` to create curried versions of the stepper for stubbing multiple pieces.  The below example shows how you could use stepper with proxyquire to stub the query function on a mysql connection pool.

```js
var mymodule = proxyquire('path/to/mymodule', {
  '../db/mysql': {
    query: stepper.as('mysql.query');
  }
});

stepper.add(function (method, query, data) {
  assert.equal(method, 'mysql.query');
  assert.equal(query, 'SELECT NOW()');
  assert.deepEqual(data, []);
});
```

## Usage

#### `stepperbox([steps])`

Returns a stepper instance, a callable function with chainable methods defining the behavior of the function at each invocation.  An array of callbacks may be provided to be used as the initial steps.

#### `stepper([arg1, ...])`

Calling the stepper function invokes each defined step as if it had been called directly, passing in all arguments received.

#### `stepper.as('name')`

Returns a standalone function (without the stepper methods) which will be bound with the provided name as the first argument received (see the mysql example above).

#### `stepper.add(callback)`

Appends a callback step to the end of the current chain

#### `stepper.onCall(index, callback)`

Inserts a callback step at the specified index (0 based) in the sequence.

#### `stepper.onFirstCall(callback)`, `stepper.onSecondCall(callback)`, `stepper.onThirdCall(callback)`

Syntactic sugar for `onCall`. Inserts a callback step at the first, second or third positions, respectively.

#### `stepper.reset()`

Resets the stepper position to the first step.

#### `stepper.reset(true)`

Resets the stepper position, and removes all existing steps.

#### `stepper.reset(<Array>)`

Resets the stepper position, and overwrites all existing steps with the callbacks provided in the array.

