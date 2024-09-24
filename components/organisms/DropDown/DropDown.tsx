"use client";
import React, { useState } from "react";
import styles from "./DropDown.module.css";

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
      {isOpen && (
        <div
          className={`${styles["modal-backdrop"]} ${
            isOpen ? styles["open"] : ""
          }`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={styles["dropdown-container"]}>
        <button className={styles["dropdown-toggle"]} onClick={toggleDropdown}>
          <span className={styles["arrow"]}>&#9662;</span>
        </button>

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
