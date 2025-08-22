import React from "react";
import { FieldError } from "react-hook-form";
import styles from "./styles.module.css";
import Text from "../Text";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  id?: string;
  options: Option[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: FieldError;
  labelColor?: string;
  borderColor?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  placeholder = "Seleccione una opción",
  value,
  onChange,
  error,
  labelColor = "var(--white)",
  borderColor = "var(--white)",
  className,
}) => {
  return (
    <div className={`${styles.selectContainer} ${className || ""}`}>
      <select
        defaultValue=""
        id={id}
        className={styles.select}
        style={{ borderColor }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <Text color="red" align="left" className={styles.error}>
          {error.message}
        </Text>
      )}
    </div>
  );
};
