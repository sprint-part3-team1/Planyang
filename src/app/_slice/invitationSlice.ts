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

interface InivitationsType {
  data: {
    invitations: [] | InivationInformationType[];
    totalCount: number;
  } | null;
}

const initialState: InivitationsType = {
  data: null,
};

const asynchGetMyInvitation = createAsyncThunk(
  'invitationSlice/asynchGetMyInvitation',

  async (dashBoardId: number) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/dashboards/${dashBoardId}/invitations?page=1&size=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

const asynchFetchinviteUserToDashboard = createAsyncThunk(
  'invitationSlice/asynchFetchinviteUserToDashboard',

  async (invitedUser: { email: string; dashBoardId: number }) => {
    const accessToken = localStorage.getItem('accessToken');
    const { email, dashBoardId } = invitedUser;

    const response = await axios.post(
      `https://sp-taskify-api.vercel.app/4-1/dashboards/${dashBoardId}/invitations`,
      {
        email,
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

const asynchFetchDeleteInvited = createAsyncThunk(
  'invitationSlice/asynchFetchDeleteInvited',

  async (deleteInvitedValue: { dashBoardId: number; invitationId: number }) => {
    const accessToken = localStorage.getItem('accessToken');
    const { dashBoardId, invitationId } = deleteInvitedValue;

    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/dashboards/${dashBoardId}/invitations/${invitationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return invitationId;
  },
);

const invitationSlice = createSlice({
  name: 'invitationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchGetMyInvitation.fulfilled,
      (state, action: PayloadAction<InivitationsType['data']>) => {
        state.data = action.payload;
      },
    );

    builder.addCase(
      asynchFetchinviteUserToDashboard.fulfilled,
      (state, action: PayloadAction<InivationInformationType>) => {
        state.data?.invitations.unshift(action.payload);
        state.data.totalCount++;
      },
    );

    builder.addCase(asynchFetchDeleteInvited.fulfilled, (state, action) => {
      const invitationIdToDelete = action.payload;
      state.data.totalCount--;
      const updatedInvitations = state.data?.invitations.filter(
        (invitation) => invitation.id !== invitationIdToDelete,
      );
      state.data.invitations = updatedInvitations;
    });
  },
});

export default invitationSlice.reducer;

export const invitationActions = {
  ...invitationSlice.actions,
  asynchGetMyInvitation,
  asynchFetchinviteUserToDashboard,
  asynchFetchDeleteInvited,
};

export const invitationData = (state: RootState) => state.invitationData.data;
