import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllAdmin } from "../../services/user/allAdmis";
import { Course } from "../../types/types/course.types";
import { fetchCoursesData } from "../../services/courses/coursesData";
interface coursesAdminPanelState {
  coursePanel: Course[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: coursesAdminPanelState = {
  coursePanel:
    typeof window !== "undefined" && localStorage.getItem("courseAdminPanel")
      ? JSON.parse(localStorage.getItem("courseAdminPanel") || "[]")
      : null,
  loading: false,
  error: null,
};

export const fetchCourseAdminPanel = createAsyncThunk<
  Course[],
  void,
  { rejectValue: string }
>("courseAdminPanel/fetchCourseAdminPanel", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchCoursesData();
    if (response && response.admins) {
      return response.admins;
    } else {
      return [];
    }
  } catch (error) {
    return rejectWithValue("Error fetching courses");
  }
});

const coursesAdminPanelSlice = createSlice({
  name: "coursesPanel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseAdminPanel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseAdminPanel.fulfilled, (state, action) => {
        state.coursePanel = action.payload;
        state.loading = false;

        if (typeof window !== "undefined") {
          localStorage.setItem("courseAdminPanel", JSON.stringify(action.payload));
        }
      })
      .addCase(fetchCourseAdminPanel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default coursesAdminPanelSlice.reducer;
