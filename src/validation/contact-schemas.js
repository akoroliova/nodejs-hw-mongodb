import Joi from 'joi';
import {
  typeList,
  phoneRegexp,
  emailRegexp,
} from '../constants/contacts-constants.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().pattern(phoneRegexp).required(),
  email: Joi.string().pattern(emailRegexp),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
