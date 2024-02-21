import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Topic } from "../../types/types/topic.type";

interface TopicsState {
  selectedTopic: Topic | null;
}

const persistedTopic = localStorage.getItem("selectedTopic");
const initialState: TopicsState = {
  selectedTopic: persistedTopic ? JSON.parse(persistedTopic) : null,
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    selectTopic(state, action: PayloadAction<Topic>) {
      state.selectedTopic = action.payload;
      localStorage.setItem("selectedTopic", JSON.stringify(action.payload));
    },
  },
});

export const { selectTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
