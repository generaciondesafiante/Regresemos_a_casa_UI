import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "../../types/types/lessons.type";
interface LessonState {
  selectedLesson: Lesson | null;
}
const persistedLesson =
  typeof window !== "undefined"
    ? localStorage.getItem("persistedLesson")
    : null;

const initialState: LessonState = {
  selectedLesson: persistedLesson ? JSON.parse(persistedLesson) : null,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    selectLesson(state, action: PayloadAction<Lesson>) {
      state.selectedLesson = action.payload;
      localStorage.setItem("selectedLesson", JSON.stringify(action.payload));
    },
  },
});

export const { selectLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
