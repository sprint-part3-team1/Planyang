import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';
import {
  UpdateInformationPayloadType,
  ChangePasswordPayloadType,
  RegisterPayloadType,
} from '../_types/_redux/_apiPayload/payloadTypes';
import { RegisterStateType } from '../_types/_redux/_state/reduxState';

interface ErrorResponse {
  message: string;
}

const initialState: RegisterStateType = {
  data: null,
  error: null, // 에러 상태 추가
};

const asynchFetchSignUp = createAsyncThunk(
  'registerSlice/asynchFetchSignup',
  async (registerData: RegisterPayloadType) => {
    const { email, nickname, password } = registerData;

    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/users',
      {
        email,
        nickname,
        password,
      },
    );
    return response;
  },
);

const asynchFetchChangePassword = createAsyncThunk(
  'registerSlice/asynchFetchChangePassword',
  async (
    changePasswordValue: ChangePasswordPayloadType,
    { rejectWithValue },
  ) => {
    const { password, newPassword } = changePasswordValue;
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.put(
        'https://sp-taskify-api.vercel.app/4-1/auth/password',
        {
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        // 실패할 경우 message를 설정하여 반환
        return rejectWithValue({ error: errorResponse.message });
      }
      // 기타 오류 처리
      console.error('An error occurred:', error);
      throw error;
    }
  },
);

const asynchFetchgetUserInfo = createAsyncThunk(
  'registerSlice/asynchFetchgetUserInfo',
  async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(
      'https://sp-taskify-api.vercel.app/4-1/users/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

const asynchFetchUpdateInformation = createAsyncThunk(
  'registerSlice/asynchFetchUpdateInformation',
  async (updateValue: UpdateInformationPayloadType) => {
    const accessToken = localStorage.getItem('accessToken');
    const { nickname, profileImageUrl } = updateValue;
    const response = await axios.put(
      'https://sp-taskify-api.vercel.app/4-1/users/me',

      {
        nickname,
        profileImageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
);

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchSignUp.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<RegisterStateType['data']>,
      ) => {
        state.data = action.payload;
      },
    );

    builder.addCase(
      asynchFetchChangePassword.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<RegisterStateType['data']>,
      ) => {},
    );

    builder.addCase(
      asynchFetchChangePassword.rejected, // 비밀번호 변경 실패 처리 추가
      (state: RegisterStateType, action: PayloadAction<{ error: string }>) => {
        state.error = action.payload.error;
      },
    );

    builder.addCase(
      asynchFetchgetUserInfo.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<RegisterStateType['data']>,
      ) => {
        state.data = action.payload;
      },
    );

    builder.addCase(
      asynchFetchUpdateInformation.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<RegisterStateType['data']>,
      ) => {
        state.data = action.payload;
      },
    );
  },
});

export default registerSlice.reducer;
export const registerActions = {
  ...registerSlice.actions,
  asynchFetchChangePassword,
  asynchFetchSignUp,
  asynchFetchgetUserInfo,
  asynchFetchUpdateInformation,
};
export const userResponse = (state: RootState) => state.userResponse;
