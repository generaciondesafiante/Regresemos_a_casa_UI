import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resource } from "../../types/types/Resources";

interface GroupedResources {
  public: Resource[];
  private: Resource[];
  restrictedIncourse: Resource[];
}

const initialState: { Resources: GroupedResources } = {
  Resources: {
    public: [],
    private: [],
    restrictedIncourse: [],
  },
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    allResources(state, action: PayloadAction<Resource[]>) {
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
          default:
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
