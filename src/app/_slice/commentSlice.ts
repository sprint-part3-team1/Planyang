import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface AuthorType {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}
export interface CommentDetailType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: AuthorType;
}

interface CommentStateType {
  data: {
    cursorId: number;
    comment: CommentDetailType[];
  } | null;
}

const initialState: CommentStateType = {
  data: null,
};

// 카드 ID를 객체값으로 파라미터로 받습니다
const asyncFetchGetComment = createAsyncThunk(
  'commentSlice/asyncFetchGetComment',
  async (getCommentValue: { cardId: number }) => {
    const { cardId } = getCommentValue;
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/comments?size=10&cursorId=0&cardId=${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

// 댓글값, 카드 ID, 칼럼ID , 대시보드 id를 순서대로 객체값으로 받습니다
const asyncFetchLeaveComment = createAsyncThunk(
  'commentSlice/asyncFetchLeaveComment',
  async (leaveCommentValue: {
    content: string;
    cardId: number;
    columnId: number;
    dashboardId: number;
  }) => {
    const { content, cardId, columnId, dashboardId } = leaveCommentValue;
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/comments',
      {
        content,
        cardId,
        columnId,
        dashboardId,
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

// 수정할 댓글값, 수정할 카드 ID를 순서대로 객체값으로 받습니다
const asyncFetchUpdateComment = createAsyncThunk(
  'commentSlice/asyncFetchUpdateComment',
  async (updateCommentValue: { content: string; cardId: number }) => {
    const { content, cardId } = updateCommentValue;
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.put(
      `https://sp-taskify-api.vercel.app/4-1/comments/${cardId}`,
      {
        content,
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


// 삭제할 댓글의 ID를 파라미터로 받습니다
const asynchFetchDeleteComment = createAsyncThunk(
  'commentSlice/asynchFetchDeleteComment',
  async (deleteComment: { commentId: number }) => {
    const { commentId } = deleteComment;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return commentId;
  },
);
const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncFetchGetComment.fulfilled,
      (state, action: PayloadAction<CommentStateType['data']>) => {
        state.data = action.payload;
      },
    );

    builder.addCase(asyncFetchLeaveComment.fulfilled, (state, action) => {
      state.data?.comment.unshift(action.payload);
    });

    builder.addCase(asyncFetchUpdateComment.fulfilled, (state, action) => {
      const updateComment = action.payload;
      const index = state.data?.comment.findIndex(
        (item) => item.id === updateComment.id,
      );
      if (index !== -1) {
        state.data.comment[index] = updateComment;
      }
    });

    builder.addCase(
      asynchFetchDeleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        const deletedCommentId = action.payload;
        if (state.data) {
          state.data.comment = state.data.comment.filter(
            (item) => item.id !== deletedCommentId,
          );
        }
      },
    );
  },
});

export default commentSlice.reducer;

export const commentActions = {
  ...commentSlice.actions,
  asyncFetchGetComment,
  asyncFetchLeaveComment,
  asyncFetchUpdateComment,
  asynchFetchDeleteComment,
};

export const commentData = (state: RootState) => state.columnData.data;
