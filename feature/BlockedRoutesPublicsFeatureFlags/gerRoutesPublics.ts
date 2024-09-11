import { featureFlags } from "./featureFlagsPublics";

const getRoutes = Object.values(featureFlags)
.filter(flag => flag.enabled)
.flatMap(flag => flag.routes);

export default getRoutes;
