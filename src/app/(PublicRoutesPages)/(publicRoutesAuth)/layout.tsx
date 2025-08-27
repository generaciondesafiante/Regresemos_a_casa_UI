import { Menu } from "@/shared/components/Menu/Menu";
import AuthLayout from "@/shared/Layouts/auth";

const layoutePublicRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLayout>{children}</AuthLayout>
    </>
  );
};

export default layoutePublicRoutes;
