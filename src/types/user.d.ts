export type TokenProviderType = {
  tokenDto: { accessToken: string; refreshToken: string };
  baseRole: 'ADMIN' | 'USER' | 'GUEST';
};

export type MemberInfoDto = {
  nickname: string;
  profileImgUrl: string;
  latitude: number;
  longitude: number;
};
