import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../types/types/course.types";

interface CoursesState {
  selectedCourse: Course | null;
}

const persistedCourse =
  typeof window !== "undefined" ? localStorage.getItem("selectedCourse") : null;

const initialState: CoursesState = {
  selectedCourse: persistedCourse ? JSON.parse(persistedCourse) : null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    selectCourse(state, action: PayloadAction<Course>) {
      state.selectedCourse = action.payload;
      localStorage.setItem("selectedCourse", JSON.stringify(action.payload));
    },

    clearSelectedCourse(state) {
      state.selectedCourse = null;
      localStorage.removeItem("selectedCourse");
    },
  },
});

export const { selectCourse, clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
