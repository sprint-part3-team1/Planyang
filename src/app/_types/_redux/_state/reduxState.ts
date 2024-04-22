export interface RegisterStateType {
  data: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface LoginStateType {
  data: {
    user: {
      id: number;
      email: string;
      nickname: string;
      profileImageUrl: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  } | null;
  error: null | string;
}
