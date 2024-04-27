import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface MembersResponseType {
  data: {
    members: [
      {
        id: number;
        email: string;
        nickname: string;
        profileImageUrl: string | null;
        createdAt: string;
        updatedAt: string;
        isOwner: boolean;
        userId: number;
      },
    ];
    totalCount: number;
  } | null;
}

const initialState: MembersResponseType = {
  data: null,
};

const asyncGetMembers = createAsyncThunk(
  'memberSlice/asyncGetMembers',

  async (createdDashboard: { dashboardId: number; page: number }) => {
    const { dashboardId, page } = createdDashboard;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/members?page=${page}&size=4&dashboardId=${dashboardId}`,
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

const asyncDeleteMember = createAsyncThunk(
  'memberSlice/asyncDeleteMember',

  async (deleteMember: { memberId: number }) => {
    const { memberId } = deleteMember;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/members/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return memberId;
  },
);

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncGetMembers.fulfilled,
      (state, action: PayloadAction<MembersResponseType['data']>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(
      asyncDeleteMember.fulfilled,
      (state, action: PayloadAction<number>) => {
        const memberId = action.payload;
        if (state.data) {
          state.data.members = state.data?.members?.filter(
            (item) => item.id !== memberId,
          );
        }
      },
    );
  },
});

export default memberSlice.reducer;

export const memberActions = {
  ...memberSlice.actions,
  asyncGetMembers,
  asyncDeleteMember,
};

export const memberData = (state: RootState) => state.memberData.data;
