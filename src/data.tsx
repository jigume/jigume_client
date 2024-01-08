import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { InitAuth, InitUser } from './types/data';

const { persistAtom } = recoilPersist();

export const initAuth: InitAuth = {
  role: 'GUEST',
  accessToken: '',
  refreshToken: '',
  expired: undefined,
};

export const initUser: InitUser = {
  position: undefined,
  filter: [],
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
