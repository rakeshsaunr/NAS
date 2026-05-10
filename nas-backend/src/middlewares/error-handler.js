function errorHandler(err, req, res, next) {
  console.error(err.stack || err);

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
    });
  }
}

module.exports = errorHandler
