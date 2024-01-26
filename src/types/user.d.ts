export type TokenProviderType = {
  tokenDto: { accessToken: string; refreshToken: string };
  baseRole: 'ADMIN' | 'USER' | 'GUEST';
};

export type MemberInfoDto = {
  nickname: string;
  profileImageUrl: string;
  mapX: number;
  mapY: number;
};
