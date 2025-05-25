import RestApiService from './api';
import createManager from './api/axios';


console.log('API baseURL:', import.meta.env.VITE_API_URL);

const apiService = new RestApiService({
  userApi: createManager({ baseURL: import.meta.env.VITE_API_URL }),
});

export {
  apiService,
};

export default apiService;
