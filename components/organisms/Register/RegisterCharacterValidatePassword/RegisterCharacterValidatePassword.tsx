import { FC } from "react";
import { CheckRegisterIcion, ErrorRegisterIcon } from "../../../atoms";
import styles from "./RegisterCharacterValidatePassword.module.css";

interface PasswordValidationProps {
  isValid: boolean;
  message: string;
  colorTextCharacter?: string;
}
export const PasswordValidation: FC<PasswordValidationProps> = ({
  isValid,
  message,
  colorTextCharacter,
}) => {
  return (
    <p
      className={`${styles.validationMessage} ${isValid ? styles.valid : ""}`}
      style={{ color: colorTextCharacter }}
    >
      {isValid ? <CheckRegisterIcion /> : <ErrorRegisterIcon />} {message}
    </p>
  );
};
