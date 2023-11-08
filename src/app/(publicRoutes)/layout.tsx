import React from "react";
import { Menu } from "../../../components/molecules";

const layoutePublicRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default layoutePublicRoutes;
