import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://dev.mindwave.kz/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
