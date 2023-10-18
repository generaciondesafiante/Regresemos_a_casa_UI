import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../../store/store";

export function useAuthMiddleware() {
  const isAuthenticated = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login"); // Redirige a la página de inicio de sesión si no está autenticado.
  }
}
