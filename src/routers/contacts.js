import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchedContactController,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/contacts', getContactsController);
router.get('/contacts/:contactId', getContactByIdController);
router.post('/contacts', createContactController);
router.delete('/contacts/:contactId', deleteContactController);
router.patch('/contacts/:contactId', patchedContactController);

export default router;

