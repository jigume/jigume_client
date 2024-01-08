export interface InitAuth {
  role: 'GUEST' | 'USER' | 'ADMIN';
  accessToken?: string;
  refreshToken?: string;
  expired?: Date;
}

export interface InitUser {
  position?: { lat: number; lng: number };
  filter: string[];
}
