import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { RootState } from "../store/store";
import { generacionApi } from "../api";

export const useAuthStore = () => {
  console.log('useAuthStore is called');
  const { status, errorMessage, user } = useSelector(
    (state: RootState) => state.auth
  ); 
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log('startLogin is called');
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
      
    } catch (error) {
      dispatch(onLogout("Error en autenticación"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    console.log('checkAuthToken is called')
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await generacionApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", String(new Date().getTime()));
      dispatch(onLogin(data));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };


  return {
    //*Properties
    status,
    errorMessage,
    user,
    //*methods
    startLogin,
    checkAuthToken,
  };
};
