import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./APIs/userApi";
import userSlice from "./slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    user:userSlice,
    modals: modalSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      userApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>