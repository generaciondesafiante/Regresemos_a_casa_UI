"use client";
import React, { useState } from "react";
import styles from "./Dropdown.module.css"; 

interface DropdownProps {
  options: string[];
  onChange: (value: string) => void;
  selectedValue?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false); 
  };
  return (
    <>
      {/* Fondo oscuro detrás del modal */}
      {isOpen && (
        <div
          className={`${styles["modal-backdrop"]} ${
            isOpen ? styles["open"] : ""
          }`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={styles["dropdown-container"]}>
        {/* Botón que muestra el valor seleccionado o una indicación para seleccionar */}
        <button className={styles["dropdown-toggle"]} onClick={toggleDropdown}>
          {/* {selectedValue ? selectedValue : "Selecciona"}{" "} */}
          <span className={styles["arrow"]}>&#9662;</span>
        </button>

        {/* Menú emergente como modal */}
        {isOpen && (
          <div
            className={`${styles["dropdown-menu"]} ${
              isOpen ? styles["open"] : ""
            }`}
          >
            {options.map((option) => (
              <div
                key={option}
                className={`${styles["dropdown-item"]} ${
                  option === selectedValue ? styles["selected"] : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
