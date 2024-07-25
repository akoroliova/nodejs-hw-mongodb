import Joi from 'joi';
import { typeList } from '../constants/contacts-constants.js';
import { emailRegexp, phoneRegexp } from '../constants/index.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().pattern(phoneRegexp).required(),
  email: Joi.string().min(3).max(20).pattern(emailRegexp),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(phoneRegexp),
  email: Joi.string().min(3).max(20).pattern(emailRegexp),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
