import { MemberInfoDto } from '@src/types/user';

export type MyPageContextType = {
  setProfileHeader: React.Dispatch<React.SetStateAction<ProfileHeaderType>>;
  profile: MemberInfoDto;
  isSuccess: boolean;
  refetch: () => Promise<QueryObserverResult<MemberInfoDto, unknown>>;
  leadData: SellHistoryDto[];
  leadSuccess: boolean;
  leadLoading: boolean;
  joinData: OrderHistoryDto[];
  joinSuccess: boolean;
  joinLoading: boolean;
};

export type NewProfileType = {
  nickname: string;
  image: string | undefined;
  imageInput: File | undefined;
};

export type ProfileHeaderType = {
  title: string;
  isAlert: boolean;
};
