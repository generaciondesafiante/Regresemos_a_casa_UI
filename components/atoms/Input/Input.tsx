"use client";
import React, { ChangeEvent, CSSProperties, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "./Input.module.css";

interface InputProps {
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  id?: string;
  htmlForm?: string;
  labelColor?: string;
  inputColor?: string;
  isRequire?: boolean;
  className?: string;
  buttonColor?: string;
  borderColor?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  type,
  placeholder,
  label,
  id,
  htmlForm,
  labelColor,
  inputColor,
  isRequire,
  buttonColor,
  borderColor,
  ref,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = isPasswordVisible ? "text" : "password";

  const showToggle = type === "password" && value && value.length > 1;

  const labelStyle: CSSProperties = {
    color: labelColor || "var(--white)",
  };

  const inputStyle: CSSProperties = {
    color: inputColor || "transparent",
    border: borderColor
      ? `var(--border) ${borderColor}`
      : "var(--border) var(--white)",
  };
  const buttonStyle: CSSProperties = {
    color: buttonColor || "var(--white)",
  };
  return (
    <div className={styles["input-container_inputLabel"]}>
      <input
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type === "password" ? inputType : type}
        required={isRequire}
        placeholder={placeholder}
        className={styles["input-input"]}
        style={{ ...inputStyle }}
      />
      {showToggle && (
        <button
          type="button"
          className={styles["password-toggle_button"]}
          onClick={togglePasswordVisibility}
          style={{ ...buttonStyle, position: "absolute", right: "-10" }}
        >
          {isPasswordVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </button>
      )}
      <label
        htmlFor={htmlForm}
        className={`${styles["input-label"]} ${
          value && value.length > 1 ? styles.active : ""
        }`}
        style={labelStyle}
      >
        {label}
      </label>
    </div>
  );
};
