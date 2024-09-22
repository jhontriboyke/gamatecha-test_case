const responseFormat = (req, res, next) => {
  res.success = (statusCode = 200, message, data = null) => {
    res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  };

  res.error = (statusCode, message, data = null) => {
    res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  };

  res.fail = (statusCode, message, data = null) => {
    res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  };

  next();
};

module.exports = responseFormat;
