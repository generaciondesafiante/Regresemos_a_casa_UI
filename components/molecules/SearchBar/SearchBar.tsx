"use client";
import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import IconSearch from "../../atoms/SearchBar/SearchBar";

interface SearchBarProps {
  placeholder?: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar...",
  setSearchQuery,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); 
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      <IconSearch className={styles["iconSearch"]} />
    </div>
  );
};
