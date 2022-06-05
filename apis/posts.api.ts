import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';
import { PostType, UploadType } from 'types/post';

class PostsAPI extends BaseAPI {
  //https://apibora.shop/api/posts/
  uploadPost(body: UploadType, config: CustomAxiosRequestConfig) {
    return this.post(``, body, config);
  }

  editPost(params: unknown, body: UploadType, config: CustomAxiosRequestConfig) {
    return this.put(`/${params}`, body, config);
  }

  deletePost(params: unknown, config: CustomAxiosRequestConfig) {
    return this.delete(`/${params}`, config);
  }

  getMyPost(config: CustomAxiosRequestConfig) {
    return this.get<PostType[]>(`/me`, config);
  }

  likePost(params: unknown, config: CustomAxiosRequestConfig) {
    return this.post(`/${params}/scrap`, {}, config);
  }
}

export default new PostsAPI('posts');
