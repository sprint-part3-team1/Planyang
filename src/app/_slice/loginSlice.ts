import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponseType {
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
}

const initialState: LoginResponseType = {
  data: null,
};

const asynchFetchSignIn = createAsyncThunk(
  'userDataSlice/asynchFetchSignIn',

  async (loginData: LoginPayload) => {
    const { email, password } = loginData;

    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/auth/login',
      {
        email,
        password,
      },
    );
    return response.data;
  },
);

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchSignIn.fulfilled,
      (state, action: PayloadAction<LoginResponseType['data']>) => {
        state.data = action.payload;
      },
    );
  },
});

export default loginSlice.reducer;
export const loginActions = {
  ...loginSlice.actions,
  asynchFetchSignIn,
};
export const loginData = (state: RootState) => state.loginData.data;
