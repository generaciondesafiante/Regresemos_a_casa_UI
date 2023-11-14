import React, { ChangeEvent, CSSProperties } from "react";
import styles from "./Input.module.css";

interface InputProps {
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  label?: string;
  id?: string;
  htmlForm?: string;
  labelColor?: string;
  inputColor?: string; // Nueva propiedad para el color del input
  isRequire?: boolean;
  className?: string;
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
}) => {
  const labelStyle: CSSProperties = {
    color: labelColor || "var(--white)",
  };

  const inputStyle: CSSProperties = {
    color: inputColor || "var(--white)",
  };

  return (
    <div className={styles["form-input-container_inLa"]}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={isRequire}
        placeholder={placeholder}
        className={styles["form-input-input"]}
        style={inputStyle}
      />
      <label
        htmlFor={htmlForm}
        className={styles["form-input-label"]}
        style={labelStyle}
      >
        {label}
      </label>
    </div>
  );
};
