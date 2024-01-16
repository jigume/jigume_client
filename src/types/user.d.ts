export type TokenProviderType = {
  tokenDto: { accessToken: string; refreshToken: string };
  baseRole: 'ADMIN' | 'USER' | 'GUEST';
};
