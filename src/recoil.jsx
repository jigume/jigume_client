import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authState = atom({
  key: 'jigumeAuth',
  default: {
    role: 'GUEST',
    token: '',
    re_token: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: 'jigumeUser',
  default: {
    position: { lat: 0, lng: 0 },
    filter: [],
  },
});
