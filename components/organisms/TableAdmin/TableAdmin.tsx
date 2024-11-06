"use state";
import React, { useEffect, useState } from "react";
import { Column, Row } from "../../../types/types/tableAdmin";
import styles from "./TableAdmin.module.css";
import IconStepBackward from "../../atoms/icons/adminPanel/BackIconTable";
import { Button } from "../../atoms";
import IconBxSkipNext from "../../atoms/icons/adminPanel/NextIconTable";
import Link from "next/link";
import { Dropdown } from "../DropDown/DropDown";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";

interface ActionButtonProps {
  icon?: React.ReactNode;
  label?: string;
}

interface ButtonCreateProps {
  icon?: React.ReactNode;
  label?: string;
  href?: string;
}

interface DynamicTableProps {
  columns: Column[];
  rows: Row[];
  rowsPerPage?: number;
  actionButton?: ActionButtonProps;
  dropdownOptions?: string[];
  dropdownColumnKey?: string;
  onDropdownChange?: (value: string, row: Row) => void;
  onEdit?: (resource: Row) => void;
  noDataMessage?: string;
  searchPlaceholder?: string;
  buttonCreateProps?: ButtonCreateProps;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  rows,
  rowsPerPage = 10,
  actionButton = { label: "Editar" },
  dropdownOptions = [],
  dropdownColumnKey = "",
  onDropdownChange,
  onEdit,
  noDataMessage = "No hay datos para mostrar en la tabla.",
  searchPlaceholder = "Buscar...",
  buttonCreateProps = { label: "Agregar", href: "/dashboard" },
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("todos");
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    let updatedRows = rows;

    if (selectedDropdownValue !== "todos" && dropdownColumnKey) {
      updatedRows = rows.filter(
        (row) => row[dropdownColumnKey] === selectedDropdownValue
      );
    }

    if (search) {
      updatedRows = updatedRows.filter((row) =>
        columns.some((column) =>
          String(row[column.key]).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setFilteredRows(updatedRows);
  }, [selectedDropdownValue, search, rows, columns, dropdownColumnKey]);

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

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
  };

  const generatePagination = () => {
    const pages = [];
    const ellipsis = "...";
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pages.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`${styles["pagination__button"]} ${
              currentPage === i
                ? styles["pagination__button--current"]
                : styles["pagination__button--notCurrent"]
            }`}
          >
            {i}
          </Button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className={styles["pagination__ellipsis"]}>
            {ellipsis}
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <main className={styles["container--table"]}>
      <section className={styles["container__section-table"]}>
        <div className={styles["search-container"]}>
          <SearchBar
            placeholder={searchPlaceholder}
            setSearchQuery={setSearch}
          />
          <Link
            href={buttonCreateProps.href || "/dashboard"}
            className={styles["link__button--create"]}
          >
            <Button className={styles["button__create"]}>
              {buttonCreateProps.label}
              {buttonCreateProps.icon ?? (
                <AddCircleIcon className={styles["icon__button--create"]} />
              )}
            </Button>
          </Link>
        </div>

        <table className={styles["dynamicTable"]}>
          <thead className={`${styles["container__colums"]}`}>
            <tr className={styles["container__colums1"]}>
              {columns.map((column: any) => (
                <th key={column.key} className="header__with-dropdown">
                  {column.label}
                  {column.key === dropdownColumnKey && (
                    <Dropdown
                      options={dropdownOptions}
                      onChange={handleDropdownChange}
                      selectedValue={selectedDropdownValue}
                    />
                  )}
                </th>
              ))}
              <th></th>
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
                      onClick={() => {
                        onEdit?.(row);
                      }}
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
          {generatePagination()}
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles["pagination__button"]}
          >
            <IconBxSkipNext />
          </Button>
        </div>
      </section>
    </main>
  );
};
