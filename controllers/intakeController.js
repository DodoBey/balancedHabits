import 'express-async-errors';
import Intake from '../models/IntakeModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllIntakes = async (req, res) => {
  const { userId } = req.user;
  const intakeData = await Intake.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ intakeData });
};

export const newIntake = async (req, res) => {
  const { intake, pill } = req.body;
  const createdBy = req.user.userId;
  const date = new Date().toISOString().split('T')[0];
  const newIntake = await Intake.create({ intake, pill, date, createdBy });
  res.status(StatusCodes.CREATED).json({ newIntake });
};

export const deleteIntake = async (req, res) => {
  const { id } = req.params;
  const deletedIntake = await Intake.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ message: 'Item succesfully deleted' });
};
