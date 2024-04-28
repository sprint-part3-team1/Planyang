import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface InivationInformationType {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  invitedAccepted: null | boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReceivedInvitationsType {
  data: {
    invitations: [] | InivationInformationType[];
    cursorId: number;
  } | null;
}

const initialState: ReceivedInvitationsType = {
  data: null,
};

const asyncGetReceivedInvitations = createAsyncThunk(
  'receivedInvitationsSlice/asyncGetReceivedInvitations',

  async (searchQuery: string | null) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/invitations?size=5${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);
// https://sp-taskify-api.vercel.app/4-1/invitations?size=10&title=1

const asyncGetReceivedInvitationsByCursorId = createAsyncThunk(
  'receivedInvitationsSlice/asyncGetReceivedInvitationsByCursorId',

  async (cursorId: number) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/invitations?size=5&cursorId=${cursorId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

const asynchGetReceivedInvitationsBySearchQuery = createAsyncThunk(
  'receivedInvitationsSlice/asynchGetReceivedInvitationsBySearchQuery',

  async (searchQuery: string | null) => {
    const accessToken = localStorage.getItem('accesToken');

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/invitations?size=5${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);
const asyncAcceptInvite = createAsyncThunk(
  'receivedInvitationsSlice/asyncAcceptInvite',

  async (acceptInviteValue: { invitationId: number; isAccept: boolean }) => {
    const accessToken = localStorage.getItem('accessToken');
    const { invitationId, isAccept } = acceptInviteValue;

    const response = await axios.put(
      `https://sp-taskify-api.vercel.app/4-1/invitations/${invitationId}`,
      {
        inviteAccepted: isAccept,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return invitationId;
  },
);

const receivedInvitationsSlice = createSlice({
  name: 'receivedInvitationsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncGetReceivedInvitations.fulfilled,
      (state, action: PayloadAction<ReceivedInvitationsType['data']>) => {
        state.data = action.payload;
      },
    );

    builder.addCase(asyncAcceptInvite.fulfilled, (state, action) => {
      const deleteInvitationId = action.payload;
      if (state.data) {
        state.data.invitations = state.data.invitations.filter(
          (item) => item.id !== deleteInvitationId,
        );
      }
    });

    builder.addCase(
      asyncGetReceivedInvitationsByCursorId.fulfilled,
      (state, action: PayloadAction<ReceivedInvitationsType['data']>) => {
        state.data.invitations = [
          ...state.data.invitations,
          ...action.payload.invitations,
        ];
        state.data.cursorId = action.payload?.cursorId;
      },
    );

    builder.addCase(
      asynchGetReceivedInvitationsBySearchQuery.fulfilled,
      (state, action: PayloadAction<ReceivedInvitationsType['data']>) => {
        state.data = action.payload;
      },
    );
  },
});

export default receivedInvitationsSlice.reducer;

export const receivedInvitationActions = {
  ...receivedInvitationsSlice.actions,
  asyncGetReceivedInvitations,
  asyncAcceptInvite,
  asyncGetReceivedInvitationsByCursorId,
  asynchGetReceivedInvitationsBySearchQuery,
};

export const receivedInvitationData = (state: RootState) =>
  state.receivedInvitationData.data;
