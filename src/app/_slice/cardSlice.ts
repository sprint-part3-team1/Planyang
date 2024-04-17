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
  dueDate: string | null;
  tags: [string] | null;
  imageUrl: string | null;
}

interface CardResponseType {
  id: number;
  title: string;
  description: string;
  tags: [string] | null;
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
}

interface CardActionResponseType {
  data: CardResponseType | null;
}

interface GetCardsResponseType {
  data: {
    cards: CardResponseType[];
    totalCount: number;
    cursorId: number;
  } | null;
}

const initialState: CardActionResponseType & GetCardsResponseType = {
  data: null,
};

const asyncFetchCreateCard = createAsyncThunk(
  'cardSlice/asyncFetchCreateCard',

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
    const accessToken = localStorage.getItem('accessToken');
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

const asyncFetchGetCards = createAsyncThunk(
  'cardSlice/asyncFetchGetCards',

  async (cardData: CardPayload) => {
    const { columnId } = cardData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/cards?size=200&columnId=${columnId}`,
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

const asyncFetchPutCard = createAsyncThunk(
  'cardSlice/asyncFetchPutCard',

  async (cardData: CardResponseType) => {
    const {
      columnId,
      assignee: { id },
      id: cardId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    } = cardData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.put(
      `https://sp-taskify-api.vercel.app/4-1/cards/${cardId}`,
      {
        columnId,
        assignee: { id },
        title,
        description,
        dueDate,
        tags,
        imageUrl,
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

const asyncFetchGetCard = createAsyncThunk(
  'cardSlice/asyncFetchGetCard',

  async (cardData: CardResponseType) => {
    const { id } = cardData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/cards/${id}`,
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

const asyncFetchDeleteCard = createAsyncThunk(
  'cardSlice/asyncFetchDeleteCard',

  async (cardData: CardResponseType) => {
    const { id } = cardData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/cards/${id}`,
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

const cardSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncFetchCreateCard.fulfilled,
      (state, action: PayloadAction<CardActionResponseType['data']>) => {
        if (state.data && state.data.cards) {
          state.data.cards.unshift(action.payload);
          if (state.data.totalCount !== null) {
            state.data.totalCount++;
          }
        }
      },
    );
    builder.addCase(
      asyncFetchGetCards.fulfilled,
      (state, action: PayloadAction<GetCardsResponseType['data']>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(
      asyncFetchPutCard.fulfilled,
      (state, action: PayloadAction<CardActionResponseType['data']>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(
      asyncFetchGetCard.fulfilled,
      (state, action: PayloadAction<CardActionResponseType['data']>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(asyncFetchDeleteCard.fulfilled, (state, action) => {
      if (state.data && state.data.totalCount !== null) {
        state.data.totalCount--;
      }
    });
  },
});

export default cardSlice.reducer;
export const cardActions = {
  ...cardSlice.actions,
  asyncFetchCreateCard,
  asyncFetchGetCards,
  asyncFetchPutCard,
  asyncFetchGetCard,
  asyncFetchDeleteCard,
};
export const cardData = (state: RootState) => state.cardData.data;
