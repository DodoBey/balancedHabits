import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  const secureUser = user.toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(userId, obj);
  res.status(StatusCodes.OK).json({ message: 'User updated' });
};
