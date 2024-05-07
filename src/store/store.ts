import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./slices/userSlice";
import modalSlice from "./slices/modalSlice";
import courseSlice from "./slices/courseSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    modals: modalSlice,
    courses: courseSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
