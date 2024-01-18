import 'express-async-errors';
import Intake from '../models/IntakeModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllIntakes = async (req, res) => {
  const intakeData = await Intake.find({});
  res.status(StatusCodes.OK).json({ intakeData });
};

export const newIntake = async (req, res) => {
  const { intake, pill } = req.body;
  const date = new Date().toISOString().split('T')[0];
  const newIntake = await Intake.create({ intake, pill, date });
  res.status(StatusCodes.CREATED).json({ newIntake });
};

export const deleteIntake = async (req, res) => {
  const { id } = req.params;
  const deletedIntake = await Intake.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ message: 'Item succesfully deleted' });
};
