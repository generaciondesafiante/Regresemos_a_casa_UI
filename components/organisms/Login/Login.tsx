"use client";
import { FC, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useForm } from "../../../hooks/useForm";
import { Button, Input } from "../../atoms";
import styles from "./Login.module.css";
import Swal from "sweetalert2";

interface FormField {
  [key: string]: string;
}

const loginFormFields: FormField = {
  loginEmail: "",
  loginPassword: "",
};

export const Login: FC = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const { formState, onInputChange: onLoginInputChange } =
    useForm(loginFormFields);
  const { loginEmail, loginPassword } = formState;

  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
    console.log("echo en logincomponent");
  };

  useEffect(() => {
    if (errorMessage !== undefined)
      Swal.fire("Usuario o contraseña incorrecta", errorMessage, "warning");
  }, [errorMessage]);

  return (
    <>
      <form action="" className={styles["form-login"]} onSubmit={loginSubmit}>
        <h2 className={styles["form-login-title"]}>
          ¡Bienvenido/a al Recorrido de la fé!
        </h2>
        <Input
          id="emailLogin"
          htmlForm="emailLogin"
          value={loginEmail}
          onChange={onLoginInputChange}
          name="loginEmail"
          type="email"
          placeholder=" "
          label="Correo Electrónico"
          isRequire={true}
        />
        <Input
          id="passwordLogin"
          htmlForm="passwordLogin"
          name="loginPassword"
          value={loginPassword}
          onChange={onLoginInputChange}
          type="password"
          placeholder=" "
          label="Contraseña"
          isRequire={true}
        />
        <Link className={styles["form-login-forgot_login"]} href={"/"}>
          Olvidé mi contraseña
        </Link>

        <Button className={styles["form-login-btn"]} type="submit">
          Ingresar
        </Button>
      </form>
    </>
  );
};
