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

const initialState: RegisterStateType = {
  data: null,
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
    return response.data;
  },
);

const asynchFetchChangePassword = createAsyncThunk(
  'registerSlice/asynchFetchChangePassword',

  async (changePasswordValue: ChangePasswordPayloadType) => {
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
      (state, action: PayloadAction<ChangePasswordType>) => {},
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
export const userResponse = (state: RootState) => state.userResponse.data;
