export interface UpdateInformationPayloadType {
  nickname: string;
  profileImageUrl: string | null;
}

export interface ChangePasswordPayloadType {
  password: string;
  newPassword: string;
}

export interface RegisterPayloadType {
  email: string;
  nickname: string;
  password: string;
}

export interface LoginPayloadType {
  email: string;
  password: string;
}
