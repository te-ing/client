import axios from 'axios';

import { API } from '../config';

export const checkUserNickName = async (nickname: string) => {
    return await axios.get(`${API.users.check_nickname}=${nickname}`);
}