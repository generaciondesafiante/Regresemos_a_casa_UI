import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    visible: false,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    hideNotification: (state) => {
      state.message = null;
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
