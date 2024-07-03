

import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res, next) => {
  try {
    console.log('Received request for contacts');
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { page, perPage } = parsePaginationParams(req.query);
    const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder });

    console.log('Contacts found:', contacts);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: contacts.items,
        page: contacts.page,
        perPage: contacts.perPage,
        totalItems: contacts.totalItems,
        totalPages: contacts.totalPages,
        hasPreviousPage: contacts.hasPreviousPage,
        hasNextPage: contacts.hasNextPage,
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    next(createHttpError(500, error.message));
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => { // Переконайтеся, що цей функціонал існує
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchedContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
