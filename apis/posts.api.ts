import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';
import { PostType, UploadType } from 'types/post';

class PostsAPI extends BaseAPI {
  //https://apibora.shop/api/posts/
  uploadPost(body: UploadType, config: CustomAxiosRequestConfig) {
    return this.post(``, body, config);
  }

  getPost(params: unknown, config?: CustomAxiosRequestConfig) {
    return this.get<PostType>(`/${params}`, config);
  }

  getMainPosts() {
    return this.get<PostType[]>(`/main`);
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
    return this.post(`/${params}/like`, {}, config);
  }

  scrapPost(params: unknown, config: CustomAxiosRequestConfig) {
    return this.post(`/${params}/scrap`, {}, config);
  }
}

export default new PostsAPI('posts');
