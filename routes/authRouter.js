import { Router } from 'express';
const router = Router();

import { register, login } from '../controllers/authController.js';
import {
  validateLoginInputs,
  validateRegisterInputs,
} from '../middlewares/validationMiddleware.js';

router.post('/register', validateRegisterInputs, register);
router.post('/login', validateLoginInputs, login);

export default router;
