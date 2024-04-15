import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface UserDataPayload {
  email: string;
  nickname: string;
  password: string;
}

interface UserDataState {
  data: UserDataPayload | null;
}

const initialState: UserDataState = {
  data: null,
};

const asynchFetchSignUp = createAsyncThunk(
  'userDataSlice/asynchFetchSignup',

  async (userData: UserDataPayload) => {
    const { email, nickname, password } = userData;

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

const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchSignUp.fulfilled,
      (state, action: PayloadAction<UserDataPayload>) => {
        state.data = action.payload;
      },
    );
  },
});

export default userDataSlice.reducer;

export const userActions = {
  ...userDataSlice.actions,
  asynchFetchSignUp,
};

export const userData = (state: RootState) => state.userData.data;
