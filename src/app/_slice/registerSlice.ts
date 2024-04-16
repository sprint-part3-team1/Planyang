import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { headers } from 'next/headers';
import { RootState } from '../_store/store';

interface ChangePasswordType {
  password: string;
  newPassword: string;
}

interface RegisterPayload {
  email: string;
  nickname: string;
  password: string;
}

interface RegisterStateType {
  data: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const initialState: RegisterStateType = {
  data: null,
};

const asynchFetchSignUp = createAsyncThunk(
  'registerSlice/asynchFetchSignup',

  async (registerData: RegisterPayload) => {
    const { email, nickname, password } = registerData;

    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/users',
      {
        email,
        nickname,
        password,
      },
    );
    return response.data;
  },
);

const asynchFetchChangePassword = createAsyncThunk(
  'registerSlice/asynchFetchChangePassword',

  async (changePasswordValue: ChangePasswordType) => {
    const { password, newPassword } = changePasswordValue;
    const accessToken = localStorage.getItem('accessToken');

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
  },
);

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchSignUp.fulfilled,
      (state, action: PayloadAction<RegisterStateType['data']>) => {
        state.data = action.payload;
      },
    );

    builder.addCase(
      asynchFetchChangePassword.fulfilled,
      (state, action: PayloadAction<ChangePasswordType>) => {},
    );
  },
});

export default registerSlice.reducer;

export const registerActions = {
  ...registerSlice.actions,
  asynchFetchChangePassword,
  asynchFetchSignUp,
};
export const registerData = (state: RootState) => state.regsiterData.data;
