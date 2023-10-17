import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authState = atom({
  key: 'jigumeAuth',
  default: {
    role: 'GUEST',
    token: '',
    refreshToken: '',
    expired: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: 'jigumeUser',
  default: {
    position: undefined,
    filter: [],
  },
});
