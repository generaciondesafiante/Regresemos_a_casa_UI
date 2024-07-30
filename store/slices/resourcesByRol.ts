import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedResource } from "../../types/types/Resources";

interface GroupedResources {
  public: SelectedResource[];
  private: SelectedResource[];
  restrictedIncourse: SelectedResource[];
}

interface ResourcesState {
  Resources: GroupedResources | null;
}

const persistedResources =
  typeof window !== "undefined" ? localStorage.getItem("Resources") : null;
const initialState: ResourcesState = {
  Resources: persistedResources
    ? JSON.parse(persistedResources)
    : { public: [], private: [], restrictedIncourse: [] },
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    allResources(state, action: PayloadAction<SelectedResource[]>) {
      const groupedResources: GroupedResources = {
        public: [],
        private: [],
        restrictedIncourse: [],
      };

      action.payload.forEach((resource) => {
        switch (resource.visibility) {
          case "public":
            groupedResources.public.push(resource);
            break;
          case "private":
            groupedResources.private.push(resource);
            break;
          case "restrictedIncourse":
            groupedResources.restrictedIncourse.push(resource);
            break;
        }
      });

      state.Resources = groupedResources;
      localStorage.setItem("Resources", JSON.stringify(groupedResources));
    },
  },
});

export const { allResources } = resourcesSlice.actions;
export default resourcesSlice.reducer;
