import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers
import intakeRouter from './routes/intakeRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//public
import { dirname } from 'path';
import path from 'path';

// middlewares
import errorMiddleware from './middlewares/errorMiddleware.js';
import { fileURLToPath } from 'url';
import { authenticateUser } from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/intake', authenticateUser, intakeRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use(errorMiddleware);

const port = process.env.PORT || 3333;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log('Server is running');
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
