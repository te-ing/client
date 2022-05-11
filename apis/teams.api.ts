import { TeamEditForm, TeamTypes } from 'types/team';
import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';

class TeamsAPI extends BaseAPI {
  //https://apibora.shop/api/team/
  checkTeamProfile(params: unknown) {
    return this.get<TeamTypes>(`/${params}`);
  }
  editTeamProfile(params: unknown, body: TeamEditForm, config: CustomAxiosRequestConfig) {
    return this.put(`${params}`, body, config);
  }

  //   editUser(params: unknown, body: UserEditForm, config: CustomAxiosRequestConfig) {
  //     return this.put(`/${params}`, body, config);
  //   }
  //   kakaoOauth(body, config?: CustomAxiosRequestConfig) {
  //     return this.post<PostOauthBody, PostOauthResponse>('kakao', body, { ...config });
  //   }
  //   googleOauth(body, config?: CustomAxiosRequestConfig) {
  //     return this.post<PostOauthBody, PostOauthResponse>('google', body, { ...config });
  //   }
}

export default new TeamsAPI('team');
