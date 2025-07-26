import AppError from './../utils/appError.js';

const handleMissingQuizData = (err) => {
  const message = `Jeopardy Error: Missing or invalid quiz data – ${err.message}`;
  return new AppError(message, 400);
};

const handleInvalidBuzz = () => {
  return new AppError('You cannot buzz at this time. Please wait your turn.', 403);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('💥 UNHANDLED ERROR:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong on the server.',
    });
  }
};

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message; 

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = JsonWebTokenError();
    if (err.name === 'TokenExpiredError') error = TokenExpiredError();

    if (err.message && err.message.includes('Missing quiz data')) {
      error = handleMissingQuizData(error);
    }

    if (err.message === 'Invalid buzz attempt') {
      error = handleInvalidBuzz();
    }

    sendErrorProduction(error, res);
  }
};

export default errorController

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

function JsonWebTokenError() {
  return new AppError('Invalid token. Please log in again.', 401);
}

function TokenExpiredError() {
  return new AppError('Your session has expired. Please log in again.', 401);
}
