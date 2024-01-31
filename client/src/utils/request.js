import axios from 'axios';

const url = 'https://balanced-habits.vercel.app/api/v1';

const fetchUtil = axios.create({
  baseURL: url,
});

export default fetchUtil;
