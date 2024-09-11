interface FeatureFlagConfig {
  enabled: boolean;
  routes: string[];
}

interface FeatureFlags {
  [key: string]: FeatureFlagConfig;
}

export const featureFlags: FeatureFlags = {
  disableDashboardResources: {
    enabled:
      process.env
        .NEXT_PUBLIC_FEATURE_ROUTE_PRIVATE_DISABLE_SIDEBAR_RESOURCES === "true",
    routes: ["/dashboard/resources"],
  },
  disableDashboardFavorite: {
    enabled:
      process.env.NEXT_PUBLIC_FEATURE_ROUTE_PRIVATE_DISABLE_SIDEBAR_FAVORITE ===
      "true",
    routes: ["/dashboard/favorites"],
  },
};
