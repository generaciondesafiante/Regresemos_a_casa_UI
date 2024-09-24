"use state";
import React, { useState } from "react";
import { Column, Row } from "../../../types/types/tableAdmin";
import styles from "./TableAdmin.module.css";
import IconStepBackward from "../../atoms/icons/adminPanel/BackIconTable";
import { Button } from "../../atoms";
import IconBxSkipNext from "../../atoms/icons/adminPanel/NextIconTable";
import Link from "next/link";
import { Dropdown } from "../DropDown/DropDown";

interface ActionButtonProps {
  icon?: React.ReactNode;
  label?: string;
}

interface DynamicTableProps {
  columns: Column[];
  rows: Row[];
  searchQuery: string;
  rowsPerPage?: number;
  actionButton?: ActionButtonProps;
  dropdownOptions?: string[];
  dropdownColumnKey?: string;
  onDropdownChange?: (value: string, row: Row) => void;
  onEdit?: (resource: Row) => void;
  noDataMessage?: string;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  rows,
  searchQuery = "",
  rowsPerPage = 10,
  actionButton = { label: "Editar" },
  dropdownOptions = [],
  dropdownColumnKey = "",
  onDropdownChange,
  onEdit,
  noDataMessage = "No hay datos para mostrar en la tabla.",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDropdownValues, setSelectedDropdownValues] = useState<{
    [key: string]: string;
  }>({});
  const filteredRows = rows.filter((row) =>
    columns.some((column) =>
      String(row[column.key]).toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleDropdownChange = (value: string, columnKey: any) => {
    setSelectedDropdownValues((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
    onDropdownChange?.(value, columnKey); 
  };

  return (
    <div>
      <table className={styles["dynamicTable"]}>
        <thead className={styles["container__colums"]}>
          <tr className={styles["container__colums1"]}>
            {columns.map((column: any) => (
              <th key={column.key} className="header__with-dropdown">
                {column.label}
                {column.key === dropdownColumnKey && (
                  <Dropdown
                    options={dropdownOptions}
                    onChange={(value) =>
                      handleDropdownChange(value, column.key)
                    } 
                    selectedValue={selectedDropdownValues[column.key]}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={styles["no-data-message"]}
              >
                {noDataMessage}
              </td>
            </tr>
          ) : (
            currentRows.map((row) => (
              <tr key={row._id}>
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
                <td className={styles["action__cell--button"]}>
                  <Button
                    className={styles["action__button"]}
                    onClick={() => onEdit?.(row)}
                  >
                    {actionButton.label} {actionButton.icon}
                  </Button>
                </td>
              </tr>
            ))
          )}
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
