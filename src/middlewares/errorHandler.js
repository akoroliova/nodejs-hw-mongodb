import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    const { status, message } = err;

    res.status(status).json({
      status,
      message,
      data: err,
    });
    return;
  }

  const { status = 500, message = 'Something went wrong' } = err;

  res.status(status).json({
    status,
    message,
    data: err.message,
  });

  next();
};
