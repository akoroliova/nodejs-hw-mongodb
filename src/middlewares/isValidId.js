import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!contactId || !isValidObjectId(contactId)) {
    throw createHttpError(404, `${contactId} is not a valid id`);
  }

  next();
};
