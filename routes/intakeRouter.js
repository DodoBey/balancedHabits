import { Router } from 'express';
const router = Router();

import {
  getAllIntakes,
  newIntake,
  deleteIntake,
} from '../controllers/intakeController.js';
import {
  validateId,
  validateIntakeInput,
} from '../middlewares/validationMiddleware.js';

router.route('/').get(getAllIntakes).post(validateIntakeInput, newIntake);
router.route('/:id').delete(validateId, deleteIntake);

export default router;
