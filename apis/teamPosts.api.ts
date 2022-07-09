import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';
import { PostType, TeamUploadType } from 'types/post';

class TeamPostsAPI extends BaseAPI {
  //https://apibora.shop/api/teams/

  getTeamPost(params: unknown, config?: CustomAxiosRequestConfig) {
    return this.get<PostType>(`/posts/${params}`, config);
  }

  uploadTeamPost(body: TeamUploadType, config: CustomAxiosRequestConfig) {
    return this.post(`/posts`, body, config);
  }

  editTeamPost(params: number, body: TeamUploadType, config: CustomAxiosRequestConfig) {
    return this.put(`/posts/${params}`, body, config);
  }
  deleteTeamPost(params: number, config: CustomAxiosRequestConfig) {
    return this.delete(`posts/${params}`, config);
  }
}

export default new TeamPostsAPI('teams');
