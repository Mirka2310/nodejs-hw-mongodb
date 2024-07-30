import { SORT_ORDER } from '../constans/index.js';
import { contactsCollection } from '../db/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = contactsCollection
    .find({ userId })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  if (filter.isFavourite !== undefined) {
    contactsQuery = contactsQuery
      .where('isFavourite')
      .equals(filter.isFavourite);
  }

  const contactsCount = await contactsCollection.countDocuments({ userId });
  const contacts = await contactsQuery.exec();
  const paginationData = calculatePaginationData(contactsCount, limit, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await contactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};
export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    payload,
    {
      new: true,
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
export const deleteContact = async (contactId, userId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};