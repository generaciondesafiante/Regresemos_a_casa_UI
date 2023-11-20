"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import { Button, Input } from "../../atoms";
import styles from "./ResetPassword.module.css";

export const ResetPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const resetSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire(
        "Error de autenticación",
        "Las contraseñas no son iguales",
        "error"
      );
      return;
    }

    try {
      const responseUpdate = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      Swal.fire({
        icon: "success",
        title: "Contraseña modificada",
        text: "Los cambios en tu perfil han sido guardados exitosamente.",
        didClose: () => {
          window.location.href = "/loginPage";
        },
      });
    } catch (error) {
      Swal.fire(
        "Error",
        "Ocurrió un error al guardar los cambios. Por favor, intenta nuevamente.",
        "error"
      );
    }
  };
  return (
    <form
      className={styles["form-reset_container"]}
      action=""
      onSubmit={resetSubmitPassword}
    >
      <h2 className={`${styles["form-reset_title"]}`}>
        Asignar nueva contraseña
      </h2>
      <p className={`${styles["form-reset_paragraph"]}`}>
        Al terminar, te enviaremos a iniciar sesión de nuevo con tu nueva
        contraseña
      </p>
      <div className={styles["form-login-container_inLa"]}>
        <Input
          id="password-change"
          htmlForm={"password-change"}
          name="password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder=" "
          label={"Contraseña"}
          isRequire={true}
        />
        <Input
          id="confirm-password-change"
          htmlForm={"confirm-password-change"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          placeholder=" "
          label={"Confirmar contraseña"}
          isRequire={true}
        />
      </div>
      <Button className={styles["form-reset_button"]} type="submit">
        Hacer el cambio de contraseña
      </Button>
    </form>
  );
};
