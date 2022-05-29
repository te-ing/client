import { PostType } from 'types/post';
import { MemberTypes, TeamEditForm, TeamTypes } from 'types/team';
import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';

class TeamsAPI extends BaseAPI {
  //https://apibora.shop/api/team/
  createTeam(body: TeamEditForm, config: CustomAxiosRequestConfig) {
    return this.post(``, body, config);
  }
  checkTeamProfile(params: unknown) {
    return this.get<TeamTypes>(`/${params}`);
  }
  getPendedMembers(params: string) {
    return this.get<MemberTypes[]>(`/${params}/pended_members`);
  }
  getTeamMembers(params: unknown) {
    return this.get<MemberTypes[]>(`/${params}/members`);
  }
  getTeamPosts(params: unknown) {
    return this.get<PostType[]>(`/${params}/posts`);
  }
  editTeamProfile(params: unknown, body: TeamEditForm, config: CustomAxiosRequestConfig) {
    return this.put(`${params}`, body, config);
  }
  deleteTeam(params: unknown, config: CustomAxiosRequestConfig) {
    return this.delete(`${params}`, config);
  }
}

export default new TeamsAPI('team');
