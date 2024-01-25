import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/errorHandlers.js';
import mongoose from 'mongoose';
import Intake from '../models/IntakeModel.js';
import User from '../models/UserModel.js';

const validationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('No intake')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('Not authorized')) {
          throw new UnauthorizedError('Not authorized');
        }
        throw new BadRequestError(errorMessages);
      } else {
        next();
      }
    },
  ];
};

export const validateIntakeInput = validationErrors([
  body('intake').notEmpty().withMessage('Intake is required'),
  body('pill').isIn(['blue', 'red']).withMessage('Should be red or blue'),
]);

export const validateId = validationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('Invalid MongdoDB id');
    const intake = await Intake.findById(value);
    if (!intake) throw new NotFoundError('No intake find with the given id');
    const isValidUser = req.user.userId === intake.createdBy.toString();
    if (!isValidUser) throw new UnauthorizedError('Not authorized');
  }),
]);

export const validateRegisterInputs = validationErrors([
  body('userName').notEmpty().withMessage('Username is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError('Email Already Exists');
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
]);

export const validateLoginInputs = validationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
]);

export const validateUpdateUserInputs = validationErrors([
  body('userName').notEmpty().withMessage('Username is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError('Email Already Exists');
    }),
]);
