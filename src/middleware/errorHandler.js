import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

const errorHandlerMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

<<<<<<< Updated upstream:src/middleware/errorHandler.js
=======
  if (err instanceof MongooseError) {
    res.status(500).json({
      status: err.status,
      message: 'Mongoose error',
    });
    return;
  }

>>>>>>> Stashed changes:src/middlewares/errorHandler.js
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};

export default errorHandlerMiddleware;