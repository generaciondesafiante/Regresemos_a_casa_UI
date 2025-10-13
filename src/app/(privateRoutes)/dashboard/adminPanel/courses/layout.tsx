import LayoutTablesAdmin from "@/shared/Layouts/admin/layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutTablesAdmin>{children}</LayoutTablesAdmin>;
};

export default layout;
