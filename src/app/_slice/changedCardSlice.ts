import { createSlice } from '@reduxjs/toolkit';

interface State {
  isChange: boolean;
}

const initialState: State = {
  isChange: false,
};

const changedCardSlice = createSlice({
  name: 'changedCardState',
  initialState,
  reducers: {
    setChangeCard(state, action) {
      state.isChange = action.payload;
    },
  },
});

export default changedCardSlice.reducer;
export const { setChangeCard } = changedCardSlice.actions;
