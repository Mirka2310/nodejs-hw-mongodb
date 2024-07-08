import { Router } from "express";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserSchema } from "../validation/auth.js";
import { loginUserSchema } from "../validation/auth.js";
import { loginUserContoller } from "../controllers/auth.js";
import { logoutUserController } from "../controllers/auth.js";
import { refreshUserSessionController } from '../controllers/auth.js';


const router = Router();
router.post
    ('/register',
        validateBody(registerUserSchema),
        ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema),
    ctrlWrapper(loginUserContoller));

router.post('/logout',ctrlWrapper(logoutUserController  ))

router.post('/refresh', ctrlWrapper(refreshUserSessionController));
export default router;