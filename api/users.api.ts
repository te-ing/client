import axios from 'axios';

import { handleEncode } from '../utils/handleEncode';
import { API } from '../config';

export const checkUserNickName = async (nickname: string) => {
  return await axios.get(`${API.users.check_nickname}=${handleEncode(nickname)}`);
};
