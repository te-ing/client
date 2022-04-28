import BaseAPI from './base.api';

import type { UserRegisterInfoType } from 'recoil/auth';

class UsersAPI extends BaseAPI {
  checkUserName(params: unknown) {
    return this.get('/check_nickname', { params });
  }
  checkUsers(params: unknown) {
    return this.get(`/${params}`);
  }
  registerUser(body: UserRegisterInfoType) {
    // id값이 서버에서 발급 받은 token 값을 의미하는지?
    return this.post(`/id`, body);
  }
}

export default new UsersAPI('users');
