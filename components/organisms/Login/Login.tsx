"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { Button, Input } from "../../atoms";
import styles from "./Login.module.css";

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
      const errorMessage = responseNextAuth.error;
      console.error(responseNextAuth?.error);
      if (errorMessage.includes("Failed to parse URL from undefined/auth")) {
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Hubo un problema con el servidor.Por favor, intenta nuevamente más tarde.",
        });
      } else if (errorMessage.includes("Server error")) {
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Hubo un problema con el servidor. Por favor, intenta nuevamente más tarde.",
        });
      } else {
        setErrors(errorMessage.split(","));
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Usuario o contraseña incorrecta",
        });
      }

      return;
    }

    router.push("/dashboard");
  };
  return (
    <>
      <form action="" className={styles["form-login"]} onSubmit={handleSubmit}>
        <h2 className={styles["form-login_title"]}>
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
          borderColor="var(--turquoise)"
          inputColor="var(--white)"
        />
        <Input
          id="passwordLogin"
          htmlForm="passwordLogin"
          name="loginPassword"
          type="password"
          value={password}
          placeholder=""
          label="Contraseña"
          isRequire={true}
          onChange={(event) => setPassword(event.target.value)}
          borderColor="var(--turquoise)"
          buttonColor="var(--white)"
          inputColor="var(--white)"
        />
        <Link
          className={styles["form-login_forgotPassword"]}
          href={"/forgetpassword"}
        >
          Olvidé mi contraseña
        </Link>

        <Button className={styles["form-login_btn"]} type="submit">
          Ingresar
        </Button>
        <Link href={'/register'} className={styles['link-register']}>
          <Button className={styles["form-register_btn"]} type="submit">
            Registro
          </Button>
        </Link>
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
