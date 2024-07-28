import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactsByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

<<<<<<< Updated upstream
import { authenticate } from '../middleware/authenticate.js';

import { upload } from '../middleware/multer.js';
=======
import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';
>>>>>>> Stashed changes

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;