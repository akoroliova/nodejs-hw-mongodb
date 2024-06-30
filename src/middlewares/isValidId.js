import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(createHttpError(404, `${contactId} is not a valid id`));
  }
  next();
};

export default isValidId;
