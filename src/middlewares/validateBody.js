import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    if (req.file) {
      return next();
    }

    await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    next();
  } catch (error) {
    const responseError = createHttpError(400, error.message, {
      errors: error.details,
    });
    next(responseError);
  }
};
