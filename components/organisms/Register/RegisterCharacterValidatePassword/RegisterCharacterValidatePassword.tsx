import { FC } from "react";
import { CheckRegisterIcion, ErrorRegisterIcon } from "../../../atoms";
import styles from "./RegisterCharacterValidatePassword.module.css";

interface PasswordValidationProps {
  isValid: boolean;
  message: string;
}
export const PasswordValidation: FC<PasswordValidationProps> = ({
  isValid,
  message,
}) => {
  return (
    <p className={`${styles.validationMessage} ${isValid ? styles.valid : ""}`}>
      {isValid ? <CheckRegisterIcion /> : <ErrorRegisterIcon />} {message}
    </p>
  );
};
