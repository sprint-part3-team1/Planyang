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
  dueDate: string | null | undefined;
  tags: string[] | null | undefined;
  imageUrl: string | null | undefined;
}

export interface CardResponseType {
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
}

interface GetCardsResponseType {
  data: {
    cards: CardResponseType[];
    totalCount: number;
    cursorId: number;
  } | null;
}
const initialState: GetCardsResponseType = {
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

  async (cardData: { sizes: number; columnId: number }) => {
    const { sizes, columnId } = cardData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/cards?size=${sizes}&columnId=${columnId}`,
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

  async (cardData: {
    columnId: number;
    assigneeUserId: number;
    cardId: number;
    title: string;
    description: string;
    dueDate: string | undefined;
    tags: string[] | undefined;
    imageUrl: string | undefined;
  }) => {
    const {
      columnId,
      assigneeUserId,
      cardId,
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
        assigneeUserId,
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

const asyncFetchDeleteCard = createAsyncThunk(
  'cardSlice/asyncFetchDeleteCard',

  async (cardData: { cardId: number }) => {
    const { cardId } = cardData;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/cards/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(cardId);
    return cardId;
  },
);

const cardSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncFetchCreateCard.fulfilled,
      (state, action) => {
        if (state.data && state.data.cards) {
          state.data.cards.unshift(action.payload?.cards);
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
    builder.addCase(asyncFetchPutCard.fulfilled, (state, action) => {
      const updateCard = action.payload;
      if (state.data) {
        const index = state.data.cards.findIndex(
          (item) => item.id === updateCard.id,
        );
        if (index !== -1) {
          state.data.cards[index] = updateCard;
        }
      }
    });
    builder.addCase(asyncFetchDeleteCard.fulfilled, (state, action) => {
      const cardId = action.payload;
      if (state.data && state.data.cards) {
        const updatedCards = state.data.cards.filter(
          (item) => item.id !== cardId,
        );
        state.data.cards = updatedCards;
        if (state.data.totalCount !== null) {
          state.data.totalCount--;
        }
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
  asyncFetchDeleteCard,
};
export const cardData = (state: RootState) => state.cardData.data;
