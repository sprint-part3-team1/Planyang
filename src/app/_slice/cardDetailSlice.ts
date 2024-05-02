import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface CardDetailStateType {
  data: {
    id: number;
    title: string;
    description: string;
    tags: string[] | null;
    dueDate: string | null;
    assignee: {
      profileImageUrl: string | null;
      nickname: string;
      id: number;
    };
    imageUrl: string | null;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const initialState: CardDetailStateType = {
  data: null,
};

const asyncFetchGetCard = createAsyncThunk(
  'cardDetailSlice/asyncFetchGetCard',

  async (cardDetailData: { cardId: number }) => {
    const { cardId } = cardDetailData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/cards/${cardId}`,
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

const cardDetailSlice = createSlice({
  name: 'cardDetailSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncFetchGetCard.fulfilled,
      (state, action: PayloadAction<CardDetailStateType['data']>) => {
        state.data = action.payload;
      },
    );
  },
});

export default cardDetailSlice.reducer;
export const cardDetailActions = {
  ...cardDetailSlice.actions,
  asyncFetchGetCard,
};
export const cardDetailData = (state: RootState) => state.cardDetailData.data;
