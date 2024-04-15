import { configureStore } from '@reduxjs/toolkit';

import registerDataReducer from '../_slice/registerSlice';
import loginDataReducer from '../_slice/loginSlice';

const store = configureStore({
  reducer: {
    regsiterData: registerDataReducer,
    loginData: loginDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
