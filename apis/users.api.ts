import BaseAPI from './base.api';

import type { UserRegisterInfoType } from 'recoil/auth';
import { User, UserEditForm } from 'types/user';
import type { CustomAxiosRequestConfig } from './type';
import { PostOauthBody, PostOauthResponse } from './type/users.types';
class UsersAPI extends BaseAPI {
  //https://apibora.shop/api/users/
  checkUserName(params: unknown) {
    return this.get('/check_nickname', { params });
  }

  checkUsers(params: unknown) {
    return this.get<User>(`/${params}`);
  }

  registerUser(body: UserRegisterInfoType) {
    // id값이 서버에서 발급 받은 token 값을 의미하는지?
    return this.post(`/id`, body);
  }

  editUser(params: unknown, body: UserEditForm, config: CustomAxiosRequestConfig) {
    return this.put(`/${params}`, body, config);
  }

  kakaoOauth(body, config?: CustomAxiosRequestConfig) {
    return this.post<PostOauthBody, PostOauthResponse>('kakao', body, { ...config });
  }

  googleOauth(body, config?: CustomAxiosRequestConfig) {
    return this.post<PostOauthBody, PostOauthResponse>('google', body, { ...config });
  }
}

export default new UsersAPI('users');
