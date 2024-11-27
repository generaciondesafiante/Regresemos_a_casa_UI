"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { RegisterFormPassword } from "../Register/RegisterFormPassword/RegisterFormPassword";
import { ArrowLeftIcon, Button, Input } from "../../atoms";
import styles from "./ChangePasswordUser.module.css";

import { useAppSelector } from "../../../store/store";
import { changePassword } from "../../../services/user/changePassword";
import { PasswordValidation } from "../../../services/user/passwordValidation";
export const ChangePasswordUser = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);

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

  const resetSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== password2) {
      Swal.fire(
        "Error de autenticación",
        "Las contraseñas no son iguales",
        "error"
      );
      return;
    }

    try {
      if (userInfo?.uid !== undefined) {
        const changeUserPassword = await changePassword(
          userInfo?.uid,
          password
        );

        if (changeUserPassword === 200) {
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: "Contraseña modificada",
            text: "Los cambios en tu perfil han sido guardados exitosamente",
            didClose: () => {
              router.push("/dashboard/profile");
            },
          });
        }
      }
    } catch (error) {
      setIsLoading(false);

      Swal.fire(
        "Error",
        "Ocurrió un error al guardar los cambios. Por favor, intenta nuevamente",
        "error"
      );
    }
  };
  const validateUserPassword = async () => {
    setIsLoading(true);

    if (userInfo?.uid !== undefined) {
      const validatePasswordData = await PasswordValidation(
        userInfo?.uid,
        currentPassword
      );
      if (validatePasswordData.ok) {
        setIsLoading(false);
        if (currentPassword === password) {
          Swal.fire(
            "Error de validación",
            "La contraseña actual y la contraseña nueva deben ser diferentes",
            "error"
          );
        } else {
          return true;
        }
      } else {
        setErrorMessage(validatePasswordData.msg);
        return false;
      }
    }
  };

  const validateSubmitPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isPasswordValid = await validateUserPassword();

      if (isPasswordValid) {
        await resetSubmitPassword(e);
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Error", "Ocurrió un error al validar la contraseña", "error");
    }
  };

  useEffect(() => {
    if (errorMessage !== "") {
      setIsLoading(false);

      Swal.fire("Contraseña actual incorrecta.", errorMessage, "warning");
    }
  }, [errorMessage]);

  const myLabelColor = "var(--darkBlue-content)";
  const myInputColor = "var(--darkBlue-content)";
  const myButtonColor = "var(--darkBlue-content)";
  const myBorderInput = "var(--turquoise)";

  return (
    <div className={styles["changePasswordUser-container"]}>
      <form
        action=""
        className={styles["changePasswordUser-modalContainer"]}
        onSubmit={validateSubmitPassword}
      >
        <Link
          href={"/dashboard/profile"}
          className={styles["changePasswordUser-returnProfile"]}
        >
          <ArrowLeftIcon />
          <p>Regresar</p>
        </Link>

        <h2 className={styles["changePasswordUser-title"]}>
          Cambiar contraseña
        </h2>

        <Input
          id={"password-change-profile"}
          htmlForm={"password-change-profile"}
          type="password"
          placeholder=""
          name="currentPassword"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          label={"Contraseña actual"}
          isRequire={true}
          labelColor={myLabelColor}
          inputColor={myInputColor}
          buttonColor={myButtonColor}
          borderColor={myBorderInput}
        />

        <RegisterFormPassword
          setPassword={setPassword}
          setPassword2={setPassword2}
          password2={password2}
          password={password}
          colorTextCharacter="var(--darkGray)"
          labelButton={"Cambiar contraseña"}
          labelColor="var(--darkBlue-content)"
          inputColor={myInputColor}
          buttonColor={myButtonColor}
          borderColor={myBorderInput}
          loanding={isLoading}
        />
        <Link href={"/dashboard/profile"}>
          <Button className={styles["changePasswordUser-cancelButton"]}>
            Cancelar
          </Button>
        </Link>
      </form>
    </div>
  );
};
