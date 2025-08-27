"use client";
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnFiltersState,
} from "@tanstack/react-table";

import Icon from "../Icons";
import Button from "../Button/Button";
import Text from "../Text";
import { Input } from "../Input/Input";

import useDebounce from "@/shared/hooks/debounce";
import { getPaginationButtons } from "./utils/paginationButtons";
import { TableProps } from "./type";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

const Table = <TData,>({
  data,
  columns,
  searchable = true,
  paginated = true,
  loading = false,
  labelButton,
  totalPages,
  currentPage,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  title,
  subTitle,
  navigateRouteButton,
  navigateRouteHeader,
  onSearchChange,
  placeHolderSearch = "Buscar...",
}: TableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedSearch = useDebounce(globalFilter, 1000);
  const router = useRouter();

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <section>
        <div className={styles.contenHeader}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Text variant="h1" color="white" align="center" bold>
              {title}
            </Text>
            {navigateRouteHeader && (
              <Icon
                name="LuPencil"
                color="white"
                size={26}
                className={styles.editIconHeader}
                onClick={() => router.push(navigateRouteHeader)}
              />
            )}
          </div>
          <Text color="white" align="center" bold>
            {subTitle}
          </Text>
        </div>
      </section>
      {searchable && (
        <section className={styles.searchBar}>
          <div style={{ width: "500px" }}>
            <Input
              type="text"
              placeholder={placeHolderSearch}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className={styles.searchInput}
              borderColor="var(--turquoise)"
              inputColor="var(--white)"
            />
          </div>

          {labelButton && (
            <Button
              icon="LuPlus"
              iconPosition="right"
              colorIcon="var(--darkBlue)"
              onClick={() => {
                router.push(navigateRouteButton);
              }}
              variant="white"
              width="18.75rem"
            >
              {labelButton}
            </Button>
          )}
        </section>
      )}

      {/* Tabla */}
      <section className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.tableHeader}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className={styles.loading}>
                  Cargando datos...
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.tableRow}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.tableCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.noData}>
                  No se encontraron datos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Paginación */}
      {paginated && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPreviousPage}
            className={styles.paginationButtonArrow}
          >
            <Icon name={"MdChevronLeft"} color="neutral" size={30} />
          </button>

          {getPaginationButtons(currentPage, totalPages).map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`${styles.paginationButton} ${
                  currentPage === page ? styles.activePage : ""
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className={styles.paginationEllipsis}>
                {page}
              </span>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className={styles.paginationButtonArrow}
          >
            <Icon name={"MdChevronRight"} color="neutral" size={30} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
