import { StatusCodes } from 'http-status-codes';

const errorMiddleWare = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({ message });
};

export default errorMiddleWare;
