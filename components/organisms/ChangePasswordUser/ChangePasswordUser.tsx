"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Input } from "../../atoms";
import styles from "./ChangePasswordUser.module.css";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export const ChangePasswordUser = () => {
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = async () => {
    try {
      const responseValidate = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/validate-password/${session?.user?.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: currentPassword,
          }),
        }
      );

      if (responseValidate.ok === true) {
        return true;
      } else {
        setErrorMessage(responseValidate.msg);
        return false;
      }
    } catch (error) {
      setErrorMessage("Contraseña actual incorrecta.");
      return false;
    }
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password/${session?.user?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );

      Swal.fire({
        icon: "success",
        title: "Contraseña modificada",
        text: "Los cambios en tu perfil han sido guardados exitosamente.",
        didClose: () => {
          window.location.href = "/dashboard/profile/changepassword";
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

  const validatePasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const isPasswordValid = await validatePassword();

      if (isPasswordValid) {
        await resetSubmitPassword(e);
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al validar la contraseña.", "error");
    }
  };

  useEffect(() => {
    if (errorMessage !== "") {
      Swal.fire("Contraseña incorrecta", errorMessage, "warning");
    }
  }, [errorMessage]);
  const myLabelColor = "#234e67";
  const myInputColor = "#234e67";

  return (
    <div className={styles["container-changePasswrod-profile"]}>
      <form
        action=""
        className={styles["content-modal"]}
        onSubmit={validatePasswordSubmit}
      >
        <Link
          href={"/dashboard/profile"}
          className={styles["link-backProfile"]}
        >
          <div className={styles["container-arrow-back"]}>
            <KeyboardBackspaceIcon />
            <p>Regresar</p>
          </div>
        </Link>
        <h2 className={styles["title-modal"]}>Cambiar Contraseña</h2>

        <Input
          htmlForm={"password-change-profile"}
          type="password"
          placeholder=" "
          name="currentPassword"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          label={"Contraseña Actual"}
          isRequire={true}
          labelColor={myLabelColor}
          inputColor={myInputColor}
        />

        <Input
          htmlForm={"passwordNew-change-profile"}
          type="password"
          placeholder=" "
          name="password"
          value={password}
          onChange={handlePasswordChange}
          label={"Nueva Contraseña"}
          labelColor={myLabelColor}
          inputColor={myInputColor}
          isRequire={true}
        />

        <Input
          htmlForm={"passwordConfirm-change-profile"}
          type="password"
          placeholder=" "
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          label={"Confirmar contraseña"}
          labelColor={myLabelColor}
          inputColor={myInputColor}
          isRequire={true}
        />

        <div className={styles["container-button-change"]}>
          <button
            // type="submit"
            className={`${styles["form-changePassword-btns"]} ${styles["button-changePassword-submit"]}`}
          >
            Cambiar Contraseña
          </button>

          <Link
            href={"/dashboard/profile"}
            className={`${styles["form-changePassword-btns"]} ${styles["button-changePassword-danger"]}`}
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};
