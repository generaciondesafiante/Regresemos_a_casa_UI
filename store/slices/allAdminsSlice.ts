import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllAdmins } from "../../types/types/allAdmins.type";

interface AllAdminState {
  admins: AllAdmins[] | null;
}

const persistedAdmin =
  typeof window !== "undefined" ? localStorage.getItem("allAdmins") : null;

const initialState: AllAdminState = {
  admins: persistedAdmin ? JSON.parse(persistedAdmin) : null,
};

const allAdminSlice = createSlice({
  name: "allAdmin",
  initialState,

  reducers: {
    allAdmins(state, action: PayloadAction<AllAdmins[]>) {
      state.admins = action.payload;
      localStorage.setItem("allAdmins", JSON.stringify(action.payload));
    },
  },
});

export const { allAdmins } = allAdminSlice.actions;
export default allAdminSlice.reducer;
