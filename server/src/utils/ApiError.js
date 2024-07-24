// here what we are doing is standardizing the error handling

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    // error stack: A string containing the stack trace
    stack = ""
  ) {
    // we will overwrite some values

    // why super is being used?
    super(message);
    // Call parent class constructor to set message
    // Without calling super, the Error class's constructor would not be executed,
    // and the message property (among others) would not be set correctly.

    // remember? -> this -> gives ref
    // here 'this' gives ref to the instance of the class it belongs to
    // this.statusCode = statusCode;

    this.statusCode = statusCode; // Set HTTP status code
    this.data = null; // Placeholder for additional error data
    this.success = false; // Indicate failure
    this.errors = errors; // Array of error details

    // this.message = message; // redundant as we are already calling super(message)

    // Capture stack trace for debugging (omit this constructor from the trace)
    if (stack) {
      this.stack = stack;
      // this stack includes where where we are getting errors
      // to get this trace, in PRODUCTION
      // this approach is being used
    } else {
      // pass the ref, and the class's instance
      Error.captureStackTrace(this, this.constructor);

      // Error.captureStackTrace is a method

      //  -> captures a stack trace at the point where it is called
      // and associates it with the error object (this).

      //  The second argument, this.constructor, tells the function
      // to exclude the current constructor (ApiError) from the stack trace.

      //  -> useful for debugging and logging,
      // -> provides a clear trace of where the error originated.
    }
  }
}

export { ApiError };
