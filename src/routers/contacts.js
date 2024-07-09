import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contact-schemas.js';
import isValidId from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  checkRoles(ROLES.USER),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

contactsRouter.delete(
  '/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  ctrlWrapper(deleteContactController),
);

//Змініть логіку роута POST /contacts, щоб при створенні нового контакту також додавалося поле userId. Значення для userId візьміть із req.user._id.
contactsRouter.post(
  '',
  checkRoles(ROLES.USER),
  validateBody(contactAddSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
