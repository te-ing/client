import { PostType, UploadType } from 'types/post';

import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';

class PostsAPI extends BaseAPI {
  //https://apibora.shop/api/team/
  uploadPost(body: UploadType, config: CustomAxiosRequestConfig) {
    return this.post(``, body, config);
  }
}

export default new PostsAPI('posts');
