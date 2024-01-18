import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { AuthType, UserType } from './types/data';

const { persistAtom } = recoilPersist();

export const initAuth: AuthType = {
  role: 'GUEST',
  accessToken: '',
  refreshToken: '',
  expired: undefined,
};

export const initUser: UserType = {
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
