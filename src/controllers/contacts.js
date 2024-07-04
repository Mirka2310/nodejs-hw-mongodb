import createHttpError from 'http-errors';
import {changeContact, createContact, deleteContact, getAllContacts, getContactsById} from '../services/contacts.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await getContactsById(contactId);
        if (!contact) {
            next(createHttpError(404, 'Contact not found'));
            return;
        }
        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const createContactController = async (req, res, next) => {
    try {
        const contact = await createContact(req.body);
        res.status(201).json({
            status: 201,
            message: 'Successfully created a contact!',
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await changeContact(contactId, req.body);
        if (!result) {
            next(createHttpError(404, 'Contact not found'));
            return;
        }
        res.json({
            status: 200,
            message: 'Successfully patched a contact!',
            data: result.contact,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await deleteContact(contactId);
        if (!contact) {
            next(createHttpError(404, 'Contact not found'));
            return;
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};