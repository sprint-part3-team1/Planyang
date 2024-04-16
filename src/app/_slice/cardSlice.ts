import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface CardPayload {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: [string];
  imageUrl: string;
}

interface CardResponseType {
  data: {
    id: number;
    title: string;
    description: string;
    tags: [string];
    dueDate: string;
    assignee: {
      profileImageUrl: string;
      nickname: string;
      id: number;
    };
    imageUrl: string;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const initialState: CardResponseType = {
  data: null,
};

const asynchFetchCreateCard = createAsyncThunk(
  'cardSlice/asynchFetchCreateCard',

  async (cardData: CardPayload) => {
    const {
      assigneeUserId,
      dashboardId,
      columnId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    } = cardData;

    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/cards',
      {
        assigneeUserId,
        dashboardId,
        columnId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      },
    );
    return response.data;
  },
);

const cardSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchCreateCard.fulfilled,
      (state, action: PayloadAction<CardResponseType['data']>) => {
        state.data = action.payload;
      },
    );
  },
});

export default cardSlice.reducer;
export const cardActions = {
  ...cardSlice.actions,
  asynchFetchCreateCard,
};
export const cardData = (state: RootState) => state.cardData.data;
