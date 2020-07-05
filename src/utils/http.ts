import axios from 'axios';
import { BASE_URL } from '../share';

const http = axios.create({
  baseURL: BASE_URL
});

export default http;
