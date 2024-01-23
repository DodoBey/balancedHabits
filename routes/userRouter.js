import { Router } from 'express';
const router = Router();

import { getUser, updateUser } from '../controllers/userController.js';
import { validateUpdateUserInputs } from '../middlewares/validationMiddleware.js';

router.get('/getCurrentUser', getUser);
router.patch('/updateUser', validateUpdateUserInputs, updateUser);

export default router;
