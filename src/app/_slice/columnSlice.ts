import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface ColumnInformationType {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

interface ColumnStateType {
  data: {
    result: string;
    data: ColumnInformationType[] | null;
  } | null;
}

const initialState: ColumnStateType = {
  data: null,
};

const asyncFetchCreateColumn = createAsyncThunk(
  'columnSlice/asyncFetchCreateColumn',

  async (columnData: { title: string; dashboardId: number }) => {
    const { title, dashboardId } = columnData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/columns',
      {
        title,
        dashboardId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
);

const asyncFetchGetColumn = createAsyncThunk(
  'columnSlice/asyncFetchGetColumn',

  async (columnData: { dashboardId: number }) => {
    const { dashboardId } = columnData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/columns?dashboardId=${dashboardId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
);

const asyncFetchPutColumn = createAsyncThunk(
  'columnSlice/asyncFetchPutColumn',

  async (columnData: { columnId: number; title: string }) => {
    const { columnId, title } = columnData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.put(
      `https://sp-taskify-api.vercel.app/4-1/columns/${columnId}
    `,
      {
        title,
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

const asyncFetchDeleteColumn = createAsyncThunk(
  'columnSlice/asyncFetchDeleteColumn',

  async (columnData: { columnId: number }) => {
    const { columnId } = columnData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/columns/${columnId}
    `,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return columnId;
  },
);

const asyncUploadCardImage = createAsyncThunk(
  'columnSlice/asyncUploadCardImage',

  async (columnData: { columnId: number; imageUrl: string }) => {
    const { columnId, imageUrl } = columnData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(
      `https://sp-taskify-api.vercel.app/4-1/columns/${columnId}/card-image
    `,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
);

const columnSlice = createSlice({
  name: 'columnSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchCreateColumn.fulfilled, (state, action) => {
      state.data?.data?.push(action.payload);
    });
    builder.addCase(asyncFetchGetColumn.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(asyncFetchPutColumn.fulfilled, (state, action) => {
      if (state.data && state.data.data) {
        const updateColumn = action.payload;
        const index = state.data.data.findIndex(
          (item) => item.id === updateColumn?.id,
        );
        if (index !== -1) {
          state.data.data[index] = updateColumn;
        }
      }
    });
    builder.addCase(asyncFetchDeleteColumn.fulfilled, (state, action) => {
      const columnId = action.payload;
      if (state.data && state.data.data) {
        const updatedColumns = state.data?.data?.filter(
          (item) => item.id !== columnId,
        );
        state.data.data = updatedColumns;
      }
    });
    builder.addCase(asyncUploadCardImage.fulfilled, (state, action) => {
      state.data?.data?.push(action.payload);
    });
  },
});

export default columnSlice.reducer;

export const columnActions = {
  ...columnSlice.actions,
  asyncFetchCreateColumn,
  asyncFetchGetColumn,
  asyncFetchPutColumn,
  asyncFetchDeleteColumn,
  asyncUploadCardImage,
};
export const columnData = (state: RootState) => state.columnData.data;
