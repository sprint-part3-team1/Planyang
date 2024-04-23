import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

export interface DashBoardDetailStateType {
  data: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  } | null;
}

const initialState: DashBoardDetailStateType = {
  data: null,
};

const asyncFetchGetDashBoardDetail = createAsyncThunk(
  'dashBoardDetail/asyncFetchGetDashBoardDetail',
  async (dashBoardIdValue: { dashBoardId: number }) => {
    const { dashBoardId } = dashBoardIdValue;
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/dashboards/${dashBoardId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

const dashBoardDetailSlice = createSlice({
  name: 'dashBoardDetailSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchGetDashBoardDetail.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default dashBoardDetailSlice.reducer;

export const dashBoardDetailActions = {
  ...dashBoardDetailSlice.actions,
  asyncFetchGetDashBoardDetail,
};

export const dashBoardDetailData = (state: RootState) =>
  state.dashBoardDetailData.data;
