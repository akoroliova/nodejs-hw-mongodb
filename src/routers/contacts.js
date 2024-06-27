import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';

const router = Router();

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.post('/contacts', ctrlWrapper(createContactController));

router.put('/contacts/:contactId', ctrlWrapper(updateContactController));

export default router;
