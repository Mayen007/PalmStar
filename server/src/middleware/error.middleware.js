function notFound(_req, _res, next) {
  const error = new Error('Route not found');
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
}

module.exports = {
  notFound,
  errorHandler,
};
