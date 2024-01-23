import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Intake from '../models/IntakeModel.js';

export const getUser = (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Get Current User' });
};

export const updateUser = (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Update User' });
};
