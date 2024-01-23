import { UnauthenticatedError } from '../errors/errorHandlers.js';
import { validateToken } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { authToken } = req.cookies;
  if (!authToken) throw new UnauthenticatedError('Invalid User');
  try {
    const { userId } = validateToken(authToken);
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Invalid User');
  }
};
