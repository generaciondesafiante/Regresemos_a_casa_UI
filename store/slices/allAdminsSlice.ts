import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllAdmins } from "../../types/types/allAdmins.type";
import { fetchAllAdmin } from "../../services/user/allAdmis";
interface AdminPanelState {
  admins: AllAdmins[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminPanelState = {
  admins:
    typeof window !== "undefined" && localStorage.getItem("admins")
      ? JSON.parse(localStorage.getItem("admins") || "[]")
      : null,
  loading: false,
  error: null,
};

export const fetchAdmins = createAsyncThunk<
  AllAdmins[],
  string,
  { rejectValue: string }
>("adminPanel/fetchAdmins", async (userId: string, { rejectWithValue }) => {
  try {
    const response = await fetchAllAdmin(userId);
    if (response && response.admins) {
      return response.admins;
    } else {
      return [];
    }
  } catch (error) {
    return rejectWithValue("Error fetching admins");
  }
});

const adminPanelSlice = createSlice({
  name: "adminPanel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
        state.loading = false;

        if (typeof window !== "undefined") {
          localStorage.setItem("admins", JSON.stringify(action.payload));
        }
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default adminPanelSlice.reducer;
