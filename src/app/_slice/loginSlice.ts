import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';
import { LoginPayloadType } from '../_types/_redux/_apiPayload/payloadTypes';
import { LoginStateType } from '../_types/_redux/_state/reduxState';

const initialState: LoginStateType = {
  data: null,
};

const asynchFetchSignIn = createAsyncThunk(
  'userDataSlice/asynchFetchSignIn',

  async (loginData: LoginPayloadType) => {
    const { email, password } = loginData;

    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/auth/login',
      {
        email,
        password,
      },
    );
    const aceessToken = response.data.accessToken;
    localStorage.setItem('accessToken', aceessToken);
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
      (
        state: LoginStateType,
        action: PayloadAction<LoginStateType['data']>,
      ) => {
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
