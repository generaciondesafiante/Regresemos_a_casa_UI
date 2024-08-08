import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resource } from "../../types/types/Resources";

interface ResourceState {
  selectedResource: Resource | null;
}

const persistedResource =
  typeof window !== "undefined"
    ? localStorage.getItem("ResourceSelected")
    : null;

const initialState: ResourceState = {
  selectedResource: persistedResource ? JSON.parse(persistedResource) : null,
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    selectedResource(state, action: PayloadAction<Resource>) {
      state.selectedResource = action.payload;
      localStorage.setItem("ResourceSelected", JSON.stringify(action.payload));
    },
  },
});

export const { selectedResource } = resourceSlice.actions;
export default resourceSlice.reducer;
