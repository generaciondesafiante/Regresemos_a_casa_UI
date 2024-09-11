interface FeatureFlagConfig {
  enabled: boolean;
  components: string[];
}

interface FeatureFlags {
  [key: string]: FeatureFlagConfig;
}

export const featureFlags: FeatureFlags = {
  addAdmin: {
    enabled: process.env.NEXT_PUBLIC_DISABLE_SPECIFIC_COMPONENT === "true",
    components: ["Button",],
  },
  home: {
    enabled: process.env.NEXT_PUBLIC_DISABLE_SPECIFIC_COMPONENT === "true",
    components: ["Button", "Input"],
  },
};
