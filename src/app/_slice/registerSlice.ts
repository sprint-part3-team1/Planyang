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
  status: number | null;
}

const initialState: RegisterStateType = {
  data: null,
  error: null,
  status: null, // 에러 상태 추가
};

const resetData = (state: RegisterStateType) => {
  state.data = null;
};

const asynchFetchSignUp = createAsyncThunk(
  'registerSlice/asynchFetchSignup',
  async (registerData: RegisterPayloadType, { rejectWithValue }) => {
    try {
      const { email, nickname, password } = registerData;

      const response = await axios.post(
        'https://sp-taskify-api.vercel.app/4-1/users',
        {
          email,
          nickname,
          password,
        },
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        // 실패할 경우 message와 status를 설정하여 반환
        return rejectWithValue({
          error: errorResponse.message,
          status: error.response?.status,
        });
      }
      // 기타 오류 처리
      console.error('An error occurred:', error);
      throw error;
    }
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
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        // 실패할 경우 message와 status를 설정하여 반환
        return rejectWithValue({
          error: errorResponse.message,
          status: error.response?.status,
        });
      }
      // 기타 오류 처리
      console.error('An error occurred:', error);
      throw error;
    }
  },
);

const asynchFetchgetUserInfo = createAsyncThunk(
  'registerSlice/asynchFetchgetUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(
        'https://sp-taskify-api.vercel.app/4-1/users/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;

        return rejectWithValue({
          error: errorResponse.message,
          status: error.response?.status,
        });
      }

      console.error('An error occurred:', error);
      throw error;
    }
  },
);

const asynchFetchUpdateInformation = createAsyncThunk(
  'registerSlice/asynchFetchUpdateInformation',
  async (updateValue: UpdateInformationPayloadType, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const { nickname, profileImageUrl } = updateValue;
      const response = await axios.put(
        'https://sp-taskify-api.vercel.app/4-1/users/me',
        { nickname, profileImageUrl },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;

        return rejectWithValue({
          error: errorResponse.message,
          status: error.response?.status,
        });
      }
      // 기타 오류 처리
      console.error('An error occurred:', error);
      throw error;
    }
  },
);

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: { resetData },
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchSignUp.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<{
          data: RegisterStateType['data'];
          status: RegisterStateType['status'];
        }>,
      ) => {
        state.data = action.payload.data;
        state.status = action.payload.status;
        state.error = null;
      },
    );

    builder.addCase(
      asynchFetchChangePassword.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<{
          data: RegisterStateType['data'];
          status: RegisterStateType['status'];
        }>,
      ) => {
        state.data = action.payload.data;
        state.status = action.payload.status;
        state.error = null;
      },
    );

    builder.addCase(
      asynchFetchChangePassword.rejected,
      (state: RegisterStateType, action) => {
        const payload = action.payload as { status?: number; error?: string };
        return {
          ...state,
          error: payload?.error,
          status: payload?.status,
        };
      },
    );

    builder.addCase(
      asynchFetchgetUserInfo.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<{
          data: RegisterStateType['data'];
          status: RegisterStateType['status'];
        }>,
      ) => {
        state.data = action.payload.data;
        state.status = action.payload.status;
        state.error = null; // 성공할 때 error 메시지를 null로 설정
      },
    );

    builder.addCase(
      asynchFetchUpdateInformation.fulfilled,
      (
        state: RegisterStateType,
        action: PayloadAction<{
          data: RegisterStateType['data'];
          status: RegisterStateType['status'];
        }>,
      ) => {
        state.data = action.payload.data;
        state.status = action.payload.status;
        state.error = null; // 성공할 때 error 메시지를 null로 설정
      },
    );

    builder.addCase(
      asynchFetchgetUserInfo.rejected,
      (state: RegisterStateType, action) => {
        const payload = action.payload as { status?: number; error?: string };
        return {
          ...state,
          error: payload?.error,
          status: payload?.status,
        };
      },
    );

    builder.addCase(
      asynchFetchUpdateInformation.rejected,
      (state: RegisterStateType, action) => {
        const payload = action.payload as { status?: number; error?: string };
        return {
          ...state,
          error: payload?.error,
          status: payload?.status,
        };
      },
    );

    builder.addCase(
      asynchFetchSignUp.rejected,
      (state: RegisterStateType, action) => {
        const payload = action.payload as { status?: number; error?: string };
        return {
          ...state,
          error: payload?.error,
          status: payload?.status,
        };
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
