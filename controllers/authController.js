import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { comparePassword, hashpassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/errorHandlers.js';
import { createToken } from '../utils/tokenUtils.js';

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

  const token = createToken({ userId: user._id });

  const dayInMs = 1000 * 60 * 60 * 24;

  res.cookie('authToken', token, {
    httpOnly: true,
    expires: new Date(Date.now() + dayInMs),
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({ message: 'User succesfully logged in' });
};
