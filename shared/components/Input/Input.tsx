"use client";
import React, { CSSProperties, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "./Input.module.css";
import Text from "../Text";

interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  id?: string;
  htmlForm?: string;
  labelColor?: string;
  inputColor?: string;
  borderColor?: string;
  buttonColor?: string;
  className?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  // React Hook Form
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  label,
  id,
  htmlForm,
  labelColor,
  inputColor,
  borderColor,
  buttonColor,
  className,
  register,
  error,
  name,
  onChange,
  value,
  required = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = isPasswordVisible ? "text" : type;
  const showToggle = type === "password";

  const labelStyle: CSSProperties = {
    color: labelColor || "var(--white)",
  };

  const inputStyle: CSSProperties = {
    color: inputColor || "var(--white)",
    border: borderColor
      ? `var(--border) ${borderColor}`
      : "var(--border) var(--white)",
  };

  const buttonStyle: CSSProperties = {
    color: buttonColor || "var(--white)",
  };

  return (
    <div
      className={`${styles["input-container_inputLabel"]} ${className || ""}`}
    >
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        className={styles["input-input"]}
        style={inputStyle}
        value={value}
        {...register}
        autoComplete="off"
        autoCorrect="off"
        required={required}
      />

      <label
        htmlFor={htmlForm}
        className={`${styles["input-label"]}`}
        style={labelStyle}
      >
        {label}
      </label>

      {showToggle && (
        <button
          type="button"
          className={styles["password-toggle_button"]}
          onClick={togglePasswordVisibility}
          style={buttonStyle}
        >
          {isPasswordVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </button>
      )}

      {/* Mostrar error si lo hay */}
      {error && (
        <Text color="red" align="left" className={styles["input-error"]}>
          {error.message}
        </Text>
      )}
    </div>
  );
};
