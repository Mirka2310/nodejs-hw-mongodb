import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserShema,
  registerUserShema,
  requestResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  refreshUserSessionController,
  logoutUserController,
} from '../controllers/auth.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserShema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserShema),
  ctrlWrapper(loginUserController),
);
router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;