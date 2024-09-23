import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resource } from "../../types/types/Resources";

interface ResourceState {
    resourceEditAdmin: Resource | null;
}

const persistedResource =
  typeof window !== "undefined"
    ? localStorage.getItem("ResourceEditAdmin")
    : null;

const initialState: ResourceState = {
    resourceEditAdmin: persistedResource ? JSON.parse(persistedResource) : null,
};

const resourceSlice = createSlice({
  name: "resourceEdit",
  initialState,
  reducers: {
    resourceEditAdmin(state, action: PayloadAction<Resource>) {
      state.resourceEditAdmin = action.payload;
      localStorage.setItem("ResourceEditAdmin", JSON.stringify(action.payload));
    },
  },
});

export const { resourceEditAdmin: resourceEditAdmin } = resourceSlice.actions;
export default resourceSlice.reducer;
