import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  Topic1 } from "../../types/types/topic.type";

interface TopicsState {
    allTopicWithinACourse: Topic1 | null;
}

const persistedTopic =
  typeof window !== "undefined" ? localStorage.getItem("allTopicWithinACourse") : null;
const initialState: TopicsState = {
    allTopicWithinACourse: persistedTopic ? JSON.parse(persistedTopic) : null,
};

const allTopicsWithinACourseSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    allTopicWithinACourse(state, action: PayloadAction<Topic1>) {
      state.allTopicWithinACourse = action.payload;
      localStorage.setItem("allTopicWithinACourse", JSON.stringify(action.payload));
    },
  },
});

export const { allTopicWithinACourse } = allTopicsWithinACourseSlice.actions;
export default allTopicsWithinACourseSlice.reducer;
