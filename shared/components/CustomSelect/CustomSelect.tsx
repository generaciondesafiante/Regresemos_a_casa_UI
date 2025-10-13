"use client";
import styles from "./styles.module.css";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onSelect: (value: string) => void;
  className?: string;
  value?: string;
}

export const CustomSelect = ({
  options,
  placeholder = "Seleccionar...",
  onSelect,
  className = "",
  value = "",
}: CustomSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <select
      className={`${styles.customSelect} ${className}`}
      value={value}
      onChange={handleChange}
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
