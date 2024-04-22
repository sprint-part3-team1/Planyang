import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';
import { LoginPayloadType } from '../_types/_redux/_apiPayload/payloadTypes';
import { LoginStateType } from '../_types/_redux/_state/reduxState';

const initialState: LoginStateType = {
  data: null,
  error: 'this is error message',
};

// const asynchFetchSignIn = createAsyncThunk(
//   'userDataSlice/asynchFetchSignIn',

//   async (loginData: LoginPayloadType) => {
//     const { email, password } = loginData;

//     const response = await axios.post(
//       'https://sp-taskify-api.vercel.app/4-1/auth/login',
//       {
//         email,
//         password,
//       },
//     );
//     const aceessToken = response.data.accessToken;
//     localStorage.setItem('accessToken', aceessToken);
//     return response.data;
//   },
// );

const asynchFetchSignIn = createAsyncThunk(
  'userDataSlice/asynchFetchSignIn',
  async (loginData: LoginPayloadType, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;

      const response = await axios.post(
        'https://sp-taskify-api.vercel.app/4-1/auth/login',
        {
          email,
          password,
        },
      );
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return response.data;
    } catch (error) {
      let errorMessage = '오류가 발생했습니다.';
      if (error.response) {
        // 서버에서 에러 응답이 온 경우
        errorMessage = error.response.data.message;
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error('서버로부터 응답이 없습니다.');
        errorMessage = '서버로부터 응답이 없습니다.';
      } else {
        // 요청을 보내기 전에 발생한 오류
        console.error('요청을 보내는 중 오류가 발생했습니다.', error.message);
      }
      console.error(errorMessage); // 에러 메시지 출력
      return rejectWithValue({ message: errorMessage });
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
      (
        state: LoginStateType,
        action: PayloadAction<LoginStateType['data']>,
      ) => {
        state.data = action.payload;
      },
    );

    builder.addCase(asynchFetchSignIn.rejected, (state, action) => {
      state.error = action.payload.message;
    });
  },
});

export default loginSlice.reducer;
export const loginActions = {
  ...loginSlice.actions,
  asynchFetchSignIn,
};
export const loginData = (state: RootState) => state.loginData;
