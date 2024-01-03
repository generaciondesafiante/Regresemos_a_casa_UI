"use client";
import { FC, useState, useEffect } from "react";
import { Button, Input } from "../../../atoms";
import { PasswordValidation } from "../RegisterCharacterValidatePassword/RegisterCharacterValidatePassword";
import styles from "./RegisterFormPassword.module.css";

interface RegisterFormPasswordProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  password2: string;
  labelButton: string;
  labelColor?: string;
  inputColor?: string;
  buttonColor?: string;
  borderColor?: string;
  colorTextCharacter?: string;
}

export const RegisterFormPassword: FC<RegisterFormPasswordProps> = ({
  setPassword,
  setPassword2,
  password,
  password2,
  labelButton,
  colorTextCharacter,
  labelColor,
  inputColor,
  buttonColor,
  borderColor,
}) => {
  const [isSpecialCharValid, setSpecialCharValid] = useState(false);
  const [isNumberValid, setNumberValid] = useState(false);
  const [isLengthValid, setLengthValid] = useState(false);
  const [isLetterValid, setLetterValid] = useState(false);
  const [isFormValid, setFormValid] = useState(false);

  const handlePasswordChange = (value: string) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;
    const letterRegex = /[a-zA-Z]/;

    setSpecialCharValid(specialCharRegex.test(value));
    setNumberValid(numberRegex.test(value));
    setLengthValid(value.length >= 8);
    setLetterValid(letterRegex.test(value));

    setPassword(value);
  };

  useEffect(() => {
    setFormValid(
      isSpecialCharValid &&
        isNumberValid &&
        isLengthValid &&
        isLetterValid &&
        password !== "" &&
        password2 !== "" &&
        password === password2
    );
  }, [
    isSpecialCharValid,
    isNumberValid,
    isLengthValid,
    isLetterValid,
    password,
    password2,
  ]);
  return (
    <>
      <div>
        <Input
          id={"password-form-register"}
          htmlForm={"password-form-register"}
          name="password"
          value={password}
          onChange={(event) => handlePasswordChange(event.target.value)}
          type="password"
          placeholder=" "
          label={"Contraseña"}
          isRequire={true}
          labelColor={labelColor}
          inputColor={inputColor}
          buttonColor={buttonColor}
          borderColor={borderColor}
        />
        <Input
          id={"password2-form-register"}
          htmlForm={"password2-form-register"}
          name="password2"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
          type="password"
          placeholder=" "
          label={"Repite la contraseña"}
          isRequire={true}
          labelColor={labelColor}
          inputColor={inputColor}
          buttonColor={buttonColor}
          borderColor={borderColor}
        />
        <div className={styles["registerFormPassword-characterContainer"]}>
          <PasswordValidation
            isValid={isSpecialCharValid}
            message="Mínimo un caracter especial (- . * : _)"
            colorTextCharacter={colorTextCharacter}
          />
          <PasswordValidation
            isValid={isNumberValid}
            message="Mínimo un número"
            colorTextCharacter={colorTextCharacter}
          />
          <PasswordValidation
            isValid={isLengthValid}
            message="Mínimo 8 caracteres"
            colorTextCharacter={colorTextCharacter}
          />
          <PasswordValidation
            isValid={isLetterValid}
            message="Mínimo una letra"
            colorTextCharacter={colorTextCharacter}
          />
        </div>
      </div>
      <div className={styles["registerFormPassword-containerButton"]}>
        <Button
          className={
            isFormValid
              ? styles["registerFormPassword-buttonEnabled"]
              : styles["registerFormPassword-buttonDisabled"]
          }
          type="submit"
          disabled={!isFormValid}
        >
          {labelButton}
        </Button>
      </div>
    </>
  );
};
