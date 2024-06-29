import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { contactAddSchema } from '../validation/contact-schemas.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.post(
  '/contacts',
  validateBody(contactAddSchema),
  ctrlWrapper(createContactController),
);

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default router;
