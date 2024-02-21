import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types/user.type";


interface UserState {
  userInfo: User | null;
}
const persistedUserInfo = localStorage.getItem('userInfo');

const initialState: UserState = {
  userInfo: persistedUserInfo ? JSON.parse(persistedUserInfo) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo(state, action: PayloadAction<User>) {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
});

export const { userInfo } = userSlice.actions;
export default userSlice.reducer;
