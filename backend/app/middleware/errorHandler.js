import ApiError from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? error.statusCode : 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const response = {
    code: error.statusCode,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error] ${error.statusCode} - ${error.message}`);
  }

  res.status(error.statusCode).json(response);
};

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, 'Not found'));
};