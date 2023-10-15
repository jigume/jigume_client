import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userState = atom({
  key: 'userState',
  default: {
    role: 'GUEST',
    user_id: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
