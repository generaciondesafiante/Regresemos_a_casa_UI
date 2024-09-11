"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button, Input } from "../../atoms";
import styles from "./ForgetPassword.module.css";
import { fetchValidateEamilResetPassword } from "../../../services/user/validateEmail-resetPassword";

export const ForgetPassword = () => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const checkEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseValidate = await fetchValidateEamilResetPassword(
      email,
      currentUrl
    );

    if (responseValidate?.ok) {
      Swal.fire({
        icon: "success",
        title: "Correo enviado exitosamente",
        text: "Verifica tu correo electrónico para restablecer la contraseña.",
        didClose: () => {
          router.push("/login");
          localStorage.clear();
        },
      });
    } else {
      Swal.fire(
        "Error",
        "Hubo un error al verificar el correo electrónico.",
        "error"
      );
    }
  };

  return (
    <form
      action=""
      className={styles["form-forget_container"]}
      onSubmit={checkEmailSubmit}
    >
      <h2 className={`${styles["form-forget_title"]} `}>
        He olvidado mi contraseña
      </h2>
      <p className={`${styles["form-forget_paragraph"]} `}>
        Escribe el correo electrónico con el cual te registraste
      </p>
      <Input
        id={"form-foget-input"}
        htmlForm={"form-foget-input"}
        type="email"
        name="email"
        value={email}
        placeholder=" "
        onChange={handleEmailChange}
        label={"Correo electrónico"}
        isRequire={true}
        borderColor="var(--turquoise)"
        inputColor="var(--white)"
      />
      <Button className={styles["form-forget_button"]} type="submit">
        Recuperar contraseña
      </Button>
    </form>
  );
};
