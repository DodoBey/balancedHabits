import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Server is running');
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log('server running');
});
