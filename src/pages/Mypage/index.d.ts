export type MyPageContextType = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export type NewProfileType = {
  nickname: string;
  image: string | undefined;
};
