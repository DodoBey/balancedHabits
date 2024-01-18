import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

// routers
import intakeRouter from './routes/intakeRouter.js';
import authRouter from './routes/authRouter.js';

// middlewares
import errorMiddleWare from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/intake', intakeRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use(errorMiddleWare);

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
