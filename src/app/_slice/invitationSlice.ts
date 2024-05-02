import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../_store/store';

interface InvitationInformationType {
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

interface InvitationsType {
  data: {
    invitations: InvitationInformationType[];
    totalCount: number;
  } | null;
  page: number;
}

const initialState: InvitationsType = {
  data: {
    invitations: [],
    totalCount: 0,
  },
  page: 1,
};

const asynchGetMyInvitation = createAsyncThunk(
  'invitationSlice/asynchGetMyInvitation',

  async (getInvite: { dashBoardId: number | undefined; page: any }) => {
    const accessToken = localStorage.getItem('accessToken');
    const { dashBoardId, page } = getInvite;

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/dashboards/${dashBoardId}/invitations?page=${page}&size=5`,
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
  reducers: {
    incrementPage(state) {
      if (!state.data || state.page * 5 < state.data.totalCount) {
        state.page += 1;
      }
    },
    decreasePage(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    navigateMaxPage(state) {
      state.page = Math.max(state.page, 1);
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setMaxPage(state) {
      if (state.data) {
        state.page = Math.ceil(state.data.totalCount / 5);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      asynchGetMyInvitation.fulfilled,
      (state, action: PayloadAction<InvitationsType['data']>) => {
        state.data = action.payload;
      },
    );

    builder.addCase(
      asynchFetchinviteUserToDashboard.fulfilled,
      (state, action: PayloadAction<InvitationInformationType>) => {
        state.data?.invitations.unshift(action.payload);
      },
    );

    builder.addCase(asynchFetchDeleteInvited.fulfilled, (state, action) => {
      const invitationIdToDelete = action.payload;

      if (state.data) {
        const updatedInvitations = state.data.invitations.filter(
          (invitation) => invitation.id !== invitationIdToDelete,
        );
        state.data.invitations = updatedInvitations;
      }
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

export const invitationData = (state: RootState) => state.invitationData;
