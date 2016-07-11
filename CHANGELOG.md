1.3.0 / 2016-07-11
==================

  * Added stepper.getStep() which returns the current step position (zero based).

1.2.1 / 2016-02-26
==================

  * Fix stepper.reset() not returning stepper for chaining.
  * Added test suite.

1.2.0 / 2016-02-26
==================

  * Added stepper.as('name'), which returns the stepper function bound with name as the first argument.   
    This serves as a shortcut to doing `stepper.bind(null, 'name')` for creating stubs.

1.1.0 / 2016-01-05
==================

  * Add second argument to stepper.add() that lets you define multiple sequential calls
  * Changed output for overstepping to include the arguments received

1.0.0 / 2015-12-04
==================

  * Initial release