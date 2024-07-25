// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err.stack);

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

export { errorHandler };
