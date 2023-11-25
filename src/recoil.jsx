import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const initAuth = {
  role: 'GUEST',
  accessToken: '',
  refreshToken: '',
  expired: undefined,
};

export const initUser = {
  position: undefined,
  filter: [],
  auth: undefined,
};

export const authState = atom({
  key: 'jigumeAuth',
  default: initAuth,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: 'jigumeUser',
  default: initUser,
  effects_UNSTABLE: [persistAtom],
});
