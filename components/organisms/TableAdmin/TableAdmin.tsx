"use state";
import React, { useState } from "react";
import { Column, Row } from "../../../types/types/tableAdmin";
import styles from "./TableAdmin.module.css";
import IconStepBackward from "../../atoms/icons/adminPanel/BackIconTable";
import { Button } from "../../atoms";
import IconBxSkipNext from "../../atoms/icons/adminPanel/NextIconTable";

interface DynamicTableProps {
  columns: Column[];
  rows: Row[];
  searchQuery: string;
  rowsPerPage?: number;
}
export const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  rows,
  searchQuery = "",
  rowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = rows.filter((row) =>
    columns.some((column) =>
      String(row[column.key]) // Convertir los valores en string por seguridad
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const currentRows = filteredRows.slice(startRow, endRow);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <table className={styles["dynamicTable"]}>
        <thead className={styles["container__colums"]}>
          <tr className={styles["container__colums1"]}>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles["pagination"]}>
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles["pagination__button"]}
        >
          <IconStepBackward />
        </Button>
        <span className={styles["pagination__number"]}>
          {currentPage} ... {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles["pagination__button"]}
        >
          <IconBxSkipNext />
        </Button>
      </div>
    </div>
  );
};
