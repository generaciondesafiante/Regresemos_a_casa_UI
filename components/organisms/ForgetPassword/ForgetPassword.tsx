"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button, Input } from "../../atoms";
import styles from "./ForgetPassword.module.css";

export const ForgetPassword = () => {
  const router = useRouter();

  const [email, setemail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const checkEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseValidate = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (responseValidate.ok) {
      // If the request was successful, redirect to the desired page
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
      // If there was an error in the request, show the alert with SweetAlert2
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
