import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Topic, Topic1 } from "../../types/types/topic.type";

interface TopicsState {
  selectedTopic: Topic1 | null;
}

const persistedTopic =
  typeof window !== "undefined" ? localStorage.getItem("selectedTopic") : null;
const initialState: TopicsState = {
  selectedTopic: persistedTopic ? JSON.parse(persistedTopic) : null,
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    selectTopic(state, action: PayloadAction<Topic1>) {
      state.selectedTopic = action.payload;
      localStorage.setItem("selectedTopic", JSON.stringify(action.payload));
    },
  },
});

export const { selectTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
