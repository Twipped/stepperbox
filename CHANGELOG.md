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