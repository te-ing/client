import axios from 'axios';

import { API } from '../config';

export const checkUserNickName = async (nickname: string) => {
    const empty = nickname.length === 0;
    if(empty) return;

    return await axios.get(`${API.users.check_nickname}=${nickname}`);
}