import { FC, useState } from "react";
import { Button, Input } from "../../../atoms";
import styles from "./RegisterFormPassword.module.css";
interface RegisterFormPasswordProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  password2: string;
}

interface PasswordValidationProps {
  isValid: boolean;
  message: string;
}

const PasswordValidation: FC<PasswordValidationProps> = ({
  isValid,
  message,
}) => {
  return (
    <p className={`${styles.validationMessage} ${isValid ? styles.valid : ""}`}>
      {isValid ? "✅" : "❌"} {message}
    </p>
  );
};
export const RegisterFormPassword: FC<RegisterFormPasswordProps> = ({
  setPassword,
  setPassword2,
  password,
  password2,
}) => {
  const [isSpecialCharValid, setSpecialCharValid] = useState(false);
  const [isNumberValid, setNumberValid] = useState(false);
  const [isLengthValid, setLengthValid] = useState(false);
  const [isLetterValid, setLetterValid] = useState(false);

  const handlePasswordChange = (value: string) => {
    // Puedes personalizar estas expresiones regulares según tus requisitos
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;
    const letterRegex = /[a-zA-Z]/;

    setSpecialCharValid(specialCharRegex.test(value));
    setNumberValid(numberRegex.test(value));
    setLengthValid(value.length >= 8);
    setLetterValid(letterRegex.test(value));

    setPassword(value);
  };

  return (
    <>
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
      />

      <PasswordValidation
        isValid={isSpecialCharValid}
        message="Al menos un caracter especial (- . * : _)"
      />
      <PasswordValidation
        isValid={isNumberValid}
        message="Al menos un número"
      />
      <PasswordValidation
        isValid={isLengthValid}
        message="Mínimo 8 caracteres"
      />
      <PasswordValidation
        isValid={isLetterValid}
        message="Al menos una letra"
      />
      <div className={styles["center-label-in"]}>
        <Button className={styles["form-register-btn"]} type="submit">
          Crear cuenta
        </Button>
      </div>
    </>
  );
};
