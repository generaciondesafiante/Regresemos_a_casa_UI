import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Defines the type for the initial state
export interface AuthState {
  status: string;
  user: { uid?: string; email?: string };
  errorMessage?: string | undefined;
}

// Defines the type for the actions
interface AuthActions {
  onChecking: () => void;
  onLogin: (payload: { uid?: string; email?: string }) => void;
  onLogout: (payload: string) => void;
  onCheckUserExistenceSuccess: (payload: {
    uid: string;
    email: string;
  }) => void;
  onCheckUserExistenceFailure: (payload: string) => void;
  clearErrorMessage: () => void;
}
export interface UserData {
  name: string;
  lastname: string;
  email: string;
  country: string;
  city: string;
  phone: string;
  uid: string;
  token: string;
  image: string;
}

const initialState: AuthState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },

    onLogin: (
      state,
      action: PayloadAction<{ data: UserData; token: string }>
    ) => {
      state.status = "authenticated";
      state.user = action.payload.data;
      state.errorMessage = undefined;
    },

    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload ?? undefined;
    },
    onCheckUserExistenceSuccess: (
      state,
      { payload }: PayloadAction<{ uid: string; email: string; token?: string }>
    ) => {
      state.status = "authenticatedCheck";
      state.user = { uid: payload.uid, email: payload.email };
      state.errorMessage = undefined;
    },
    onCheckUserExistenceFailure: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  onCheckUserExistenceSuccess,
  onCheckUserExistenceFailure,
} = authSlice.actions;

export default authSlice.reducer;
