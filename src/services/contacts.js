import { Contact } from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';
import { sortOrderList } from '../constants/index.js';
import { contactFieldList } from '../constants/contacts-constants.js';

export const getAllContacts = async ({
  filter,
  page,
  perPage,
  sortBy = contactFieldList[0],
  sortOrder = sortOrderList[0],
}) => {
  const skip = (page - 1) * perPage;

  const databaseQuery = Contact.find();
  if (filter.userId) {
    databaseQuery.where('userId').equals(filter.userId);
  }
  if (filter.contactType) {
    databaseQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    databaseQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const data = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await Contact.find().merge(databaseQuery).countDocuments();

  const { totalPages, hasPreviousPage, hasNextPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContact = async (filter) => {
  const contact = await Contact.findOne(filter);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (filter, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(filter, payload, {
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (filter) => {
  const contact = await Contact.findOneAndDelete(filter);

  return contact;
};
