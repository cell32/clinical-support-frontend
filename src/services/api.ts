
// import axios from 'axios'

// const API = axios.create({
//     baseURL: "http://localhost:8000/api",
// });

// export default API;

import axios from 'axios';

const BACKEND_URL = 'https://clinical-support-tool-backend.onrender.com/api';

export default axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});