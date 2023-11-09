"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, Input } from "../../atoms";
import styles from "./Login.module.css";
import Swal from "sweetalert2";

export const Login: FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));

      Swal.fire({
        icon: "error",
        title: "Error en autenticacion",
        text: "Usuario o contraseña incorrecta",
      });
      return;
    }
    return;
    router.push("/dashboard");
  };
  return (
    <>
      <form action="" className={styles["form-login"]} onSubmit={handleSubmit}>
        <h2 className={styles["form-login-title"]}>
          ¡Bienvenido/a al Recorrido de la fé!
        </h2>
        <Input
          id="emailLogin"
          htmlForm="emailLogin"
          name="loginEmail"
          type="email"
          placeholder=" "
          label="Correo Electrónico"
          isRequire={true}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          id="passwordLogin"
          htmlForm="passwordLogin"
          name="loginPassword"
          type="password"
          placeholder=" "
          label="Contraseña"
          isRequire={true}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Link className={styles["form-login-forgot_login"]} href={"/home"}>
          Olvidé mi contraseña
        </Link>

        <Button className={styles["form-login-btn"]} type="submit">
          Ingresar
        </Button>
      </form>
      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
