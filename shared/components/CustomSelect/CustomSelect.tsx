"use client";
import styles from "./styles.module.css";
import { UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  className?: string;
  value?: string;
  register?: UseFormRegisterReturn;
}

export const CustomSelect = ({
  options,
  placeholder = "Seleccionar...",
  onSelect,
  className = "",
  value,
  register,
}: CustomSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSelect) {
      onSelect(event.target.value);
    }
  };

  // Si se usa register, no controlar el componente manualmente
  const selectProps = register
    ? { ...register }
    : {
        value: value || "",
        onChange: handleChange,
      };

  return (
    <select
      className={`${styles.customSelect} ${className}`}
      {...selectProps}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
