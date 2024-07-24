// as we will use -> async await & try catch many times

// so to ease of use, we will make a utility function

// which acts as a wrapper to execute the given fn
// using async await & error handling

// Utility function to wrap async functions and handle errors
// using PROMISE -> resolve, reject (or we can use catch)
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))

      // if error occurs -> pass it to the next handler
      .catch((error) => next(error));
  };
};

export { asyncHandler };



// using -> try-catch

// const asyncHandler = () => {}
// const asyncHandler = (fn) => { () => {} } // OR // (fn) => () => {}
// const asyncHandler = async (fn) => () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     // if error occurs:
//     // return status code -> sometimes in json with some flags for next middleware
//     res.status(error.code || 500).json({
//       // these are flags
//       success: false,
//       message: error.message,
//     });
//     console.log("Error :: ", error);

//     //Pass the error to the next middleware
//     next(error);
//   }
// };
