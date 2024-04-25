export interface RegisterStateType {
  data: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  error: null | string;
  status: number | null | string;
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
  status: number | null | string;
  error: null | string;
}
