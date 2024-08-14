"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { RegisterFormPassword } from "../Register/RegisterFormPassword/RegisterFormPassword";
import { changePassword } from "../../../services/user/changePassword";
import styles from "./ResetPassword.module.css";

export const ResetPassword = () => {
  const router = useRouter();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const resetSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire(
        "Error de autenticación",
        "Las contraseñas no son iguales",
        "error"
      );
      return;
    }

    try {
      if (Array.isArray(id)) {
        throw new Error(
          "Expected a single string parameter, but received an array"
        );
      }

      const responseChangePassword = await changePassword(id, password);
      console.log(responseChangePassword);
      if (responseChangePassword?.ok) {
        Swal.fire({
          icon: "success",
          title: "Contraseña modificada",
          text: "Los cambios en tu perfil han sido guardados exitosamente.",
          didClose: () => {
            router.push("/login");
          },
        });
      } else {
        Swal.fire(
          "Error",
          "No se pudo cambiar la contraseña correctamente.",
          "error"
        );
      }
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
        Al terminar, inicia sesión con tu nueva contraseña.
      </p>
      <div className={styles["form-login-container_inLa"]}>
        <RegisterFormPassword
          setPassword={setPassword}
          setPassword2={setPassword2}
          password2={password2}
          password={password}
          colorTextCharacter="var(--white)"
          labelButton={"Hacer el cambio de contraseña"}
          labelColor="var(--white)"
          inputColor="var(--white)"
          borderColor="var(--turquoise)"
        />
      </div>
    </form>
  );
};
