export type AuthType = {
  role: 'GUEST' | 'USER' | 'ADMIN';
  accessToken?: string;
  refreshToken?: string;
  expired?: Date;
};

export type UserType = {
  position?: { lat: number; lng: number };
  filter: string[];
};
