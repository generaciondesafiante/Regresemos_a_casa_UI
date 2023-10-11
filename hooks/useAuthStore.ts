import { useDispatch, useSelector } from "react-redux";
import {
  AuthState,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { generacionApi } from "../api";

interface UserData {
  name: string;
  lastname: string;
  email: string;
  country: string;
  city: string;
  phone: string;
  uid: string;
  token: string;
  image: string;
}

// export interface AuthStore {
//   status: string;
//   errorMessage: string | undefined;
//   user: UserData;
//   startLogin: (credentials: { email: string; password: string }) => Promise<void>;
// }
interface AuthStore {
  status: string;
  errorMessage: string | undefined;
  user: Partial<UserData>; // Permite propiedades opcionales en user
  startLogin: (credentials: { email: string; password: string }) => Promise<void>;
}


export const useAuthStore = (): AuthStore => {
  const { status, errorMessage, user } = useSelector(
    (state: AuthState) => state
  );
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: { email: string; password: string }): Promise<void> => {
    dispatch(onChecking());

    try {
      const { data } = await generacionApi.post(
        "/auth",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      localStorage.setItem("name", data.name);
      localStorage.setItem("lastname", data.lastname);
      localStorage.setItem("email", data.email);
      localStorage.setItem("country", data.country);
      localStorage.setItem("city", data.city);
      localStorage.setItem("phone", data.phone);
      localStorage.setItem("id", data.uid);
      localStorage.setItem("token", data.token);
      localStorage.setItem("image", data.image);
      localStorage.setItem("token-init-date", String(new Date().getTime()));

     dispatch(onLogin({ data, token: data.token }));
        console.log(data);
      console.log("autenticado");
    } catch (error) {
      dispatch(onLogout("Error en autenticación"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  return {
    status,
    errorMessage,
    user,
    startLogin,
  };
};
