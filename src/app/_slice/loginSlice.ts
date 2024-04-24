import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';
import { LoginPayloadType } from '../_types/_redux/_apiPayload/payloadTypes';
import { LoginStateType } from '../_types/_redux/_state/reduxState';

interface ErrorResponse {
  message: string;
}

const initialState: LoginStateType = {
  data: null,
  status: null,
  error: null,
};

const asynchFetchSignIn = createAsyncThunk(
  'userDataSlice/asynchFetchSignIn',
  async (loginData: LoginPayloadType, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;
      const response = await axios.post(
        'https://sp-taskify-api.vercel.app/4-1/auth/login',
        { email, password },
      );
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      return response;
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

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchSignIn.fulfilled,
      (state: LoginStateType, action: PayloadAction<LoginStateType>) => {
        return {
          ...state,
          data: action.payload.data,
          status: action.payload.status,
          error: null,
        };
      },
    );

    builder.addCase(
      asynchFetchSignIn.rejected,
      (state: LoginStateType, action) => {
        const payload = action.payload as { error?: string };
        return {
          ...state,
          data: null,
          status: 'FAILED',
          error: payload?.error || 'An unknown error occurred.',
        };
      },
    );
  },
});

export default loginSlice.reducer;
export const loginActions = {
  ...loginSlice.actions,
  asynchFetchSignIn,
};
export const loginData = (state: RootState) => state.loginData;
