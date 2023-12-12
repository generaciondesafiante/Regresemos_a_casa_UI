import React from "react";
import { SidebarTemplate } from "../../../../components/templates";

export const runtime = "edge";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarTemplate />
      {children}
    </>
  );
};

export default layout;
