import React, { ChangeEvent } from "react";
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
  isRequire?: boolean;
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
  isRequire,
}) => {
  const labelStyle = {
    color: labelColor || "var(--white)",
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
        style={labelStyle}
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
