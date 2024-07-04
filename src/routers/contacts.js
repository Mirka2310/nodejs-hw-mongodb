import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { 
  createContactController, 
  deleteContactController, 
  getContactByIdController, 
  getContactController, 
  patchContactController } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactShema } from '../validation/contatcs.js';


const router = Router();


router.get('/', ctrlWrapper(getContactController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/',
    validateBody(createContactShema),
    ctrlWrapper(createContactController));

router.patch('/:contactId',
    validateBody(createContactShema),
    ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));



export default router;