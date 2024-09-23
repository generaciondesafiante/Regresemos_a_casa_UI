"use client";
import React, { useState } from "react";
import styles from "./Dropdown.module.css"; // Asegúrate de tener las animaciones en el CSS

interface DropdownProps {
  options: string[];
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false); // Cerrar el dropdown después de seleccionar
  };

  return (
    <div className={styles["dropdown-container"]}>
      {/* Flecha como botón */}
      <button className={styles["dropdown-toggle"]} onClick={toggleDropdown}>
        <span className={styles["arrow"]}>&#9662;</span> {/* Ícono de flecha */}
      </button>

      {/* Menú emergente */}
      {isOpen && (
        <div
          className={`${styles["dropdown-menu"]} ${
            isOpen ? styles["open"] : ""
          }`}
        >
          {options.map((option) => (
            <div
              key={option}
              className={styles["dropdown-item"]}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
