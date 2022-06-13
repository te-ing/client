import { atom } from 'recoil';

export const editPostState = atom<{ id: number }>({
  key: 'editPostState',
  default: {
    id: -1,
  },
});
