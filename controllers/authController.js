import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { comparePassword, hashpassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/errorHandlers.js';

export const register = async (req, res) => {
  const hashedPassword = await hashpassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'User successfully created' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidUser = user && (await comparePassword(password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('Invalid email or password');

  res.send('Succesfully logged in');
};
