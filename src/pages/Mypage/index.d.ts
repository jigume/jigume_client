import { MemberInfoDto } from '@src/types/user';

export type MyPageContextType = {
  setProfileHeader: React.Dispatch<React.SetStateAction<ProfileHeaderType>>;
  profile: MemberInfoDto;
  isSuccess: boolean;
};

export type NewProfileType = {
  nickname: string;
  image: string | undefined;
};

export type ProfileHeaderType = {
  title: string;
  isAlert: boolean;
};
