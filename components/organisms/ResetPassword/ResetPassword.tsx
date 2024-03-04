"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { RegisterFormPassword } from "../Register/RegisterFormPassword/RegisterFormPassword";
import styles from "./ResetPassword.module.css";

export const ResetPassword = () => {
  const router = useRouter();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // Define currentPassword

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(currentPassword);
    console.log(password, "este es password");
    console.log(password2, "este es password2");
    
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword2(e.target.value);
    console.log(e.target.value);
  };

  const handleCurrentPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
    console.log(e.target.value);    
  };

  const resetSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar si password y currentPassword son iguales
    if (password === currentPassword) {
      Swal.fire(
        "Error de autenticación",
        "La nueva contraseña no puede ser igual a la contraseña actual",
        "error"
      );
      return;
    }

    if (password !== password2) {
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
          router.push("/loginPage");
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
        Al terminar, inicia sesión con tu nueva contraseña.
      </p>
      <div className={styles["form-login-container_inLa"]}>
        <RegisterFormPassword
          setPassword={setPassword}
          setPassword2={setPassword2}
          password2={password2}
          password={password}
          currentPassword={currentPassword} // Pass currentPassword here
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
