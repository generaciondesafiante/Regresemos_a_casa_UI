"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Swal from "sweetalert2";
import { RegisterFormPassword } from "../Register/RegisterFormPassword/RegisterFormPassword";
import { Input } from "../../atoms";
import styles from "./ChangePasswordUser.module.css";
interface ValidatePasswordResponse {
  ok: boolean;
  msg: string;
}
export const ChangePasswordUser = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password2, setPassword2] = useState("");
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
    setPassword2(e.target.value);
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
      const responseData: ValidatePasswordResponse =
        await responseValidate.json();

      if (responseData.ok === true) {
        return true;
      } else {
        setErrorMessage(responseData.msg);
        return false;
      }
    } catch (error) {
      setErrorMessage("Contraseña actual incorrecta.");
      return false;
    }
  };

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
          router.push("/dashboard/profile/changepassword");
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
  const myLabelColor = "var(--blueKing)";
  const myInputColor = "var(--blueKing)";
  const myButtonColor = "var(--blueKing)";

  return (
    <div className={styles["container-changePasswrod-profile"]}>
      <form
        action=""
        className={styles["content-modal"]}
        onSubmit={validatePasswordSubmit}
      >
        <div className={styles["container-arrow-back"]}>
          <Link
            href={"/dashboard/profile"}
            className={styles["link-backProfile"]}
          >
            <KeyboardBackspaceIcon />
            <p>Regresar</p>
          </Link>
        </div>
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
          buttonColor={myButtonColor}
        />

        <RegisterFormPassword
          setPassword={setPassword}
          setPassword2={setPassword2}
          password2={password2}
          password={password}
          colorTextCharacter={"var(--blueKing)"}
          labelButton={"Cambiar Contraseña"}
          labelColor="var(--blueKing)"
          inputColor={myInputColor}
          buttonColor={myButtonColor}
        />
        <div className={styles["container-button-change"]}>
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
