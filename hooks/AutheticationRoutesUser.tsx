import { ReactNode } from "react";
import { useAuthStore } from "../hooks";
import { useRouter } from "next/navigation";

interface NextAuthProps {
  children: ReactNode;
}

const NextAuth: React.FC<NextAuthProps> = ({ children }) => {
  const { status } = useAuthStore();
  const router = useRouter();

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    router.push("/login"); // Redirige a la página de inicio de sesión en caso de no estar autenticado
    return null; // No muestra contenido si no está autenticado
  }
};

export default NextAuth;
