import axios from 'axios';

const url = '/api/v1';

const fetchUtil = axios.create({
  baseURL: url,
});

export default fetchUtil;
