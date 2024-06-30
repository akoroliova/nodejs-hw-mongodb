import { Contact } from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  const items = await Contact.find().skip(skip).limit(perPage);
  const totalItems = await Contact.countDocuments();
  const { totalPages, hasNextPage, hasPrevPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });

  return {
    items,
    totalItems,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
