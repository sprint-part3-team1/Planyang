import { configureStore } from '@reduxjs/toolkit';

import registerDataReducer from '../_slice/registerSlice';
import loginDataReducer from '../_slice/loginSlice';
import cardDataReducer from '../_slice/cardSlice';
import cardDetailDataReducer from '../_slice/cardDetailSlice';
import columnDataReducer from '../_slice/columnSlice';
import dashBoardReducer from '../_slice/dashBoardSlice';
import memberReducer from '../_slice/memberSlice';
import invitationReducer from '../_slice/invitationSlice';
import receivedInvitationReducer from '../_slice/receivedInvitationsSlice';
import dashboardDetailReducer from '../_slice/dashBoardDetail';
import commentReducer from '../_slice/commentSlice';
import changedCardReducer from '../_slice/changedCardSlice';

const store = configureStore({
  reducer: {
    userResponse: registerDataReducer,
    loginData: loginDataReducer,
    cardData: cardDataReducer,
    cardDetailData: cardDetailDataReducer,
    columnData: columnDataReducer,
    dashBoardData: dashBoardReducer,
    memberData: memberReducer,
    invitationData: invitationReducer,
    receivedInvitationData: receivedInvitationReducer,
    dashBoardDetailData: dashboardDetailReducer,
    commentData: commentReducer,
    changedCardState: changedCardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
