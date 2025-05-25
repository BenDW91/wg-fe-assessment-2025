import { User } from "src/models/Users";
import RestApiService from ".";

export default {
  getUsers(this: RestApiService) {
    return this.userApi.get<User[]>('/users');
  },
  createUser(this: RestApiService, user: User) {
    return this.userApi.post('/users', user);
  },
  updateUser(this: RestApiService, user: User) {
    return this.userApi.put(`/users/${user.id}`, user);
  },
  deleteUser(this: RestApiService, userId: User['id']) {
    return this.userApi.delete(`/users/${userId}`);
  },
};
