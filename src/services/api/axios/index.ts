import axios, { AxiosRequestConfig } from 'axios';

const DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: { 'Content-Type': 'application/json' },
};
const createManager = (requestConfig?: AxiosRequestConfig) => {
  return axios.create({ ...DEFAULT_CONFIG, ...requestConfig });
};

export default createManager;

