import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { contactFieldList } from '../constants/contacts-constants.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactFilterParams from '../utils/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { query } = req;
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query, contactFieldList);
  const filter = { ...parseContactFilterParams(query), userId };

  const data = await getAllContacts({
    filter,
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, { message: 'Contact not found' }));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, { message: 'Contact not found' }));
    return;
  }

  res.status(204).send();
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact({ _id: contactId }, req.body);

  if (!result) {
    next(createHttpError(404, { message: 'Contact not found' }));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};
