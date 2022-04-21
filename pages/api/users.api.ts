import BaseAPI from './base.api';

import { handleEncode } from '../../utils/handleEncode';

export const checkUserNickName = async (nickname: string) => {
    return await axios.get(`${API.users.check_nickname}=${handleEncode(nickname)}`);
}

class UsersAPI extends BaseAPI {
    checkUserName(params: string) {
        return this.get('')
    }
}