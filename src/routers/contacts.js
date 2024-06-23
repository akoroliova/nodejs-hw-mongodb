import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
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

export default router;
