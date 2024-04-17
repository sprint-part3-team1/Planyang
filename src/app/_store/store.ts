import { configureStore } from '@reduxjs/toolkit';

import registerDataReducer from '../_slice/registerSlice';
import loginDataReducer from '../_slice/loginSlice';
import dashBoardReducer from '../_slice/dashBoardSlice';

const store = configureStore({
  reducer: {
    regsiterData: registerDataReducer,
    loginData: loginDataReducer,
    dashBoardData: dashBoardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
