import { featureFlags } from "./featureFlagsPublics";

export const getEnabledRoutes = (routes: string[]) => {
  return routes.filter((route) => {
    const flag = Object.values(featureFlags).find(
      (flag) => flag.enabled && flag.routes.includes(route)
    );
    return !flag; 
  });
};
