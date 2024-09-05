interface FeatureFlagConfig {
  enabled: boolean;
  routes: string[];
}

interface FeatureFlags {
  [key: string]: FeatureFlagConfig;
}

export const featureFlags: FeatureFlags = {
  disableCursoBasico: {
    enabled: process.env.NEXT_PUBLIC_DISABLE_CURSO_BASICO === "true",
    routes: ["/login", "/register"],
  },
  disableQuinesSomos: {
    enabled: process.env.NEXT_PUBLIC_DISABLE_QUIENES_SOMOS === "true",
    routes: ["/quienes-somos"],
  },
};


