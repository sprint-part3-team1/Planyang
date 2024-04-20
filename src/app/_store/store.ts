import { configureStore } from '@reduxjs/toolkit';

import registerDataReducer from '../_slice/registerSlice';
import loginDataReducer from '../_slice/loginSlice';
import cardDataReducer from '../_slice/cardSlice';
import columnDataReducer from '../_slice/columnSlice';
import dashBoardReducer from '../_slice/dashBoardSlice';
import memberReducer from '../_slice/memberSlice';
import invitationReducer from '../_slice/invitationSlice';
import receivedInvitationReducer from '../_slice/receivedInvitationsSlice';

const store = configureStore({
  reducer: {
    userResponse: registerDataReducer,
    loginData: loginDataReducer,
    cardData: cardDataReducer,
    columnData: columnDataReducer,
    dashBoardData: dashBoardReducer,
    memberData: memberReducer,
    invitationData: invitationReducer,
    receivedInvitationData: receivedInvitationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
