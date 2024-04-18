import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface ColumnPayload {
  title: string;
  dashboardId: number;
}

interface ColumnResponseType {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

// 컬럼 생성
interface CreateColumnResponseType {
  data: ColumnResponseType | null;
}

// 컬럼 조회
interface GetColumnResponseType {
  result: string;
  data: ColumnResponseType[] | null;
}

const initialState: CreateColumnResponseType & GetColumnResponseType = {
  data: null,
  result: '',
};

const asyncFetchCreateColumn = createAsyncThunk(
  'columnSlice/asyncFetchCreateColumn',

  async (columnData: ColumnPayload) => {
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
    console.log(response.data);
    return response.data;
  },
);

const asyncFetchGetColumn = createAsyncThunk(
  'columnSlice/asyncFetchGetColumn',

  async (columnData: ColumnPayload) => {
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
    console.log(response.data);
    return response.data;
  },
);

const asyncFetchPutColumn = createAsyncThunk(
  'columnSlice/asyncFetchPutColumn',

  async (columnData: ColumnResponseType) => {
    const { id, title } = columnData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.put(
      `https://sp-taskify-api.vercel.app/4-1/columns/${id}
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
    console.log(response.data);
    return response.data;
  },
);

const asyncFetchDeleteColumn = createAsyncThunk(
  'columnSlice/asyncFetchDeleteColumn',

  async (columnData: ColumnResponseType) => {
    const { id } = columnData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/columns/${id}
    `,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  },
);

const columnSlice = createSlice({
  name: 'columnSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncFetchCreateColumn.fulfilled,
      (state, action: PayloadAction<CreateColumnResponseType['data']>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(
      asyncFetchGetColumn.fulfilled,
      (state, action: PayloadAction<GetColumnResponseType>) => {
        state.result = action.payload.result;
        state.data = action.payload.data;
      },
    );
    builder.addCase(
      asyncFetchPutColumn.fulfilled,
      (state, action: PayloadAction<CreateColumnResponseType['data']>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(
      asyncFetchDeleteColumn.fulfilled,
      (state, action: PayloadAction<CreateColumnResponseType['data']>) => {
        state.data = action.payload;
      },
    );
  },
});

export default columnSlice.reducer;

export const columnActions = {
  ...columnSlice.actions,
  asyncFetchCreateColumn,
  asyncFetchGetColumn,
  asyncFetchPutColumn,
  asyncFetchDeleteColumn,
};
export const columnData = (state: RootState) => state.columnData.data;
