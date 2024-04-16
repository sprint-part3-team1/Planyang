import { configureStore } from '@reduxjs/toolkit';

import registerDataReducer from '../_slice/registerSlice';
import loginDataReducer from '../_slice/loginSlice';
import columnDataReducer from '../_slice/columnSlice';

const store = configureStore({
  reducer: {
    regsiterData: registerDataReducer,
    loginData: loginDataReducer,
    columnData: columnDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
