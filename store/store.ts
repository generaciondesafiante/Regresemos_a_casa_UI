import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slices/courseSlice";
import topicsReducer from "./slices/topicsSlice";
import userReducer from "./slices/userSlice";
import resourceReducer from "./slices/ResourceSlice";
import resourcesReducer from "./slices/resourcesByRol";
import allAdminsReducer from "./slices/allAdminsSlice";
import studentsCountReducer from "./slices/studentsCountSlice";

const rootReducer = {
  courses: courseReducer,
  topics: topicsReducer,
  user: userReducer,
  resource: resourceReducer,
  resources: resourcesReducer,
  allAdmins: allAdminsReducer,
  countStudents: studentsCountReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
