import { Router } from 'express';
const router = Router();

import { getUser, updateUser } from '../controllers/userController.js';

router.get('/getCurrentUser', getUser);
router.patch('/updateUser', updateUser);

export default router;
