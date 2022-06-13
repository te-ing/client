import { ApplyType } from 'types/member';
import BaseAPI from './base.api';

import type { CustomAxiosRequestConfig } from './type';

class MembersAPI extends BaseAPI {
  //https://apibora.shop/api/member/

  confirmApply(params: string, config: CustomAxiosRequestConfig) {
    return this.put(`${params}`, {}, config);
  }
  rejectApply(params: string, config: CustomAxiosRequestConfig) {
    return this.delete(`${params}`, config);
  }
}
export default new MembersAPI('member');
