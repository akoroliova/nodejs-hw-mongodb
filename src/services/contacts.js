import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  console.log('!!!!ContactId from getContactById function: ', contactId);
  console.log('!!!!Contact from getContactById function: ', contact);
  return contact;
};
