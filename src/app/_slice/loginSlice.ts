import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';
import { LoginPayloadType } from '../_types/_redux/_apiPayload/payloadTypes';
import { LoginStateType } from '../_types/_redux/_state/reduxState';

const initialState: LoginStateType = {
  data: null,
  status: null,
};
const resetData = (state: LoginStateType) => {
  state.data = null;
  state.status = null;
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
        // 실패할 경우 status를 설정하여 반환
        return rejectWithValue({ status: error.response?.status });
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
  reducers: { resetData },
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchSignIn.fulfilled,
      (state: LoginStateType, action: PayloadAction<LoginStateType>) => {
        return {
          ...state,
          data: action.payload.data,
          status: action.payload.status,
        };
      },
    );

    builder.addCase(
      asynchFetchSignIn.rejected,
      (state: LoginStateType, action) => {
        const payload = action.payload as { status?: number };
        return {
          ...state,
          data: null,
          status: payload?.status || 'FAILED',
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
