import React from "react";
import { Menu } from "../../../../components/molecules";
import { Footer } from "../../../../components/molecules/Footer/Footer";

const layoutePublicRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
};

export default layoutePublicRoutes;
