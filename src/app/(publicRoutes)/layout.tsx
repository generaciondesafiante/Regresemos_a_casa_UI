import React from "react";
import { Menu } from "../../../components/molecules";

export const runtime = "edge";
const layoutePublicRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default layoutePublicRoutes;
