import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideoLesson, AssessmentLesson } from "../../types/types/lessons.type";

interface LessonState {
  selectedLesson: VideoLesson | AssessmentLesson | null;
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
    selectLesson(state, action: PayloadAction<{ type: string; lessonData: VideoLesson | AssessmentLesson }>) {
      const { type, lessonData } = action.payload;
      state.selectedLesson = lessonData;

      if (type === "video") {
        localStorage.setItem("persistedLesson", JSON.stringify({ type: "video", data: lessonData }));
      } else if (type === "assessment") {
        localStorage.setItem("persistedLesson", JSON.stringify({ type: "assessment", data: lessonData }));
      }
    },
  },
});

export const { selectLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
