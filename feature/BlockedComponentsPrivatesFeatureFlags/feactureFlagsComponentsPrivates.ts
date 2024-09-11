interface FeatureFlagConfig {
  enabled: boolean;
  components: string[];
}

interface FeatureFlags {
  [key: string]: FeatureFlagConfig;
}

export const featureFlags: FeatureFlags = {
  Dashboard: {
    enabled:
      process.env
        .NEXT_PUBLIC_FEATURE_COMPONENT_PRIVATE_DISABLE_DASHBOARD_RESOURCES ===
      "true",
    components: ["ResourceDashboard"],
  },
};
