import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./auth/authSlice";

const rootReducer = {
  auth: authSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;