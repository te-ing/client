import { PostType, UploadType } from 'types/post';
import { MemberTypes, TeamEditForm, TeamTypes } from 'types/team';
import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';

class TeamsAPI extends BaseAPI {
  //https://apibora.shop/api/team/
  createTeam(body: TeamEditForm, config: CustomAxiosRequestConfig) {
    return this.post(``, body, config);
  }
  checkTeamProfile(params: unknown, config?: CustomAxiosRequestConfig) {
    return this.get<TeamTypes>(`/${params}`, config);
  }
  getPendedMembers(params: string) {
    return this.get<MemberTypes[]>(`/${params}/pended-members`);
  }
  getTeamMembers(params: unknown) {
    return this.get<MemberTypes[]>(`/${params}/profile/members`);
  }
  getTeamMembersManage(params: unknown) {
    return this.get<MemberTypes[]>(`/${params}/settings/members`);
  }
  getTeamPosts(params: unknown) {
    return this.get<PostType[]>(`/${params}/posts`);
  }
  applyTeam(params: string | string[], config: CustomAxiosRequestConfig) {
    return this.post(`/${params}/apply`, {}, config);
  }
  editTeamProfile(params: unknown, body: TeamEditForm, config: CustomAxiosRequestConfig) {
    return this.put(`${params}`, body, config);
  }
  deleteTeam(params: unknown, config: CustomAxiosRequestConfig) {
    return this.delete(`${params}`, config);
  }
}

export default new TeamsAPI('team');
