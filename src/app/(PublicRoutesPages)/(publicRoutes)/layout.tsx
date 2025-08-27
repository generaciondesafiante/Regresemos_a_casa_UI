import React from "react";
import { Footer } from "../../../../components/molecules/Footer/Footer";
import { Menu } from "@/shared/components/Menu/Menu";

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
