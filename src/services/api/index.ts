import { AxiosInstance } from 'axios';
import userApi from './user.api';

interface Options {
  userApi: AxiosInstance;
}

class RestApiService {
  public userApi: AxiosInstance;

  constructor(options: Options) {
    this.userApi = options.userApi;
  }

  //users
  public getUsers = userApi.getUsers;
  public deleteUser = userApi.deleteUser;
  public updateUser = userApi.updateUser;
  public createUser = userApi.createUser;
}

export default RestApiService;
