import { PositionType } from '@src/types/map';

export type InitUserType = {
  nickname: string;
  position: PositionType | undefined;
  image: string | undefined;
  imageInput?: File;
  submitUser?: () => void;
  agreement: boolean[];
};

export type InitContextType = {
  initUser: InitUserType;
  setInitUser: React.Dispatch<React.SetStateAction<InitUserType>>;
};
