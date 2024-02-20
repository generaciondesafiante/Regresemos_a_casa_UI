import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../types/types/course.types";

interface CoursesState {
  selectedCourse: Course | null;
}

const persistedCourse = localStorage.getItem("selectedCourse");
const initialState: CoursesState = {
  selectedCourse: persistedCourse ? JSON.parse(persistedCourse) : null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    selectCourse(state, action: PayloadAction<Course>) {
      state.selectedCourse = action.payload;
      localStorage.setItem("selectedCourse", JSON.stringify(action.payload));
    },
  },
});

export const { selectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
