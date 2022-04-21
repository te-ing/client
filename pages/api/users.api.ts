import BaseAPI from './base.api';

class UsersAPI extends BaseAPI {
    checkUserName(params: unknown) {
        return this.get('/check_nickname', { params });
    }
}

export default new UsersAPI('users');