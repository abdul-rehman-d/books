import axios from 'axios';

export const BASE_URL = 'https://www.googleapis.com/books/v1/';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
