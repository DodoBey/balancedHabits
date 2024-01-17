import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import { nanoid } from 'nanoid';

let intakeData = [
  {
    '2024-01-16': [
      { id: nanoid(), intake: 'chocolate', pill: 'red' },
      { id: nanoid(), intake: 'ice cream', pill: 'red' },
      { id: nanoid(), intake: 'coke', pill: 'red' },
      { id: nanoid(), intake: 'lettuce', pill: 'blue' },
      { id: nanoid(), intake: 'coffee', pill: 'blue' },
      { id: nanoid(), intake: 'granola bar', pill: 'blue' },
      { id: nanoid(), intake: 'tea', pill: 'blue' },
    ],
  },
  {
    '2024-01-15': [
      { id: nanoid(), intake: 'chocolate', pill: 'red' },
      { id: nanoid(), intake: 'ice cream', pill: 'red' },
      { id: nanoid(), intake: 'coke', pill: 'red' },
      { id: nanoid(), intake: 'lettuce', pill: 'blue' },
      { id: nanoid(), intake: 'coffee', pill: 'blue' },
      { id: nanoid(), intake: 'granola bar', pill: 'blue' },
      { id: nanoid(), intake: 'tea', pill: 'blue' },
    ],
  },
  {
    '2024-01-14': [
      { id: nanoid(), intake: 'chocolate', pill: 'red' },
      { id: nanoid(), intake: 'ice cream', pill: 'red' },
      { id: nanoid(), intake: 'coke', pill: 'red' },
      { id: nanoid(), intake: 'lettuce', pill: 'blue' },
      { id: nanoid(), intake: 'coffee', pill: 'blue' },
      { id: nanoid(), intake: 'granola bar', pill: 'blue' },
      { id: nanoid(), intake: 'tea', pill: 'blue' },
    ],
  },
];

dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Server is running');
  res.json({ message: 'Data Received', data: req.body });
});

app.get('/api/v1/intake', (req, res) => {
  res.json({ intakeData });
});

app.post('/api/v1/intake', (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const { intake, pill } = req.body;
  if (!intake || !pill) {
    res.status(404).json({ message: 'Please provide the intake and pill' });
    return;
  }
  const id = nanoid();
  const newIntake = { id, intake, pill };
  console.log(currentDate);
  const filteredDate = intakeData.filter(
    (date) => Object.keys(date)[0] === '2024-01-14'
  );
  if (filteredDate.length > 0) {
    intakeData
      .find((date) => Object.keys(date)[0] === currentDate)
      [currentDate].push(newIntake);
  } else {
    intakeData.push({ [currentDate]: [newIntake] });
  }
  res.status(200).json({ newIntake });
});

app.delete('/api/v1/intake/:id', (req, res) => {
  const { id } = req.params;

  const modifiedData = intakeData
    .map((eachDate) => {
      const dateKey = Object.keys(eachDate)[0];
      const intakeArray = eachDate[dateKey];

      const filteredArray = intakeArray.filter((item) => item.id !== id);

      if (filteredArray.length === intakeArray.length) {
        return eachDate;
      }

      if (filteredArray.length === 0) {
        return null;
      }

      return { [dateKey]: filteredArray };
    })
    .filter(Boolean);

  // if no record found
  if (JSON.stringify(intakeData) === JSON.stringify(modifiedData)) {
    return res.status(404).json({ message: 'Item not found' });
  }

  intakeData = modifiedData;

  res.json({ message: 'Item succesfully deleted' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Something went wrong!' });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log('server running');
});
