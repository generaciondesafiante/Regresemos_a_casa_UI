"use client";
import React, { useState } from "react";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import styles from "./ResoruceAdmin.module.css";
import { Button } from "../../atoms";
import Link from "next/link";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import { DynamicTable } from "../TableAdmin/TableAdmin";
import { Column, Row } from "../../../types/types/tableAdmin";

const columns: Column[] = [
  { key: "id", label: "Id" },
  { key: "name", label: "Nombre" },
  { key: "type", label: "Tipo" },
];

const rows: Row[] = [
  { id: "John Doe", name: 25, type: "john@example.com" },
  { id: "Jane Smith", name: 30, type: "jane@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 40, type: "alice@example.com" },
  { id: "Alice Johnson", name: 40, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
  { id: "Alice Johnson", name: 35, type: "alice@example.com" },
];

export const ResourceAdmin = () => {
  const [searchQuery, setsearchQuery] = useState(""); 

  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <main className={styles["resourceAdmin"]}>
      <ArrowBack
        linkBack={"/dashboard/adminPanel"}
        text={"Regresar"}
        colorText={"white"}
        colorHover={"greenDesafiante"}
      />
      <section className={styles["container__section-table--resourceAdmin"]}>
        <h2 className={styles["title--resourceAdmin"]}>Recursos</h2>
        <div className={styles["contaier__search"]}>
          <SearchBar setSearchQuery={setsearchQuery} />
          <Link
            href={"/dashboard/adminPanel/resources/addResource"}
            className={styles["adminPanel__link-buttonEdit"]}
          >
            <Button className={styles["adminPanel__buttonEdit--admins"]}>
              Agregar
              <AddCircleIcon className={styles["addAdmin__icon"]} />
            </Button>
          </Link>
        </div>
        <DynamicTable columns={columns} rows={rows} searchQuery={searchQuery} />
      </section>
    </main>
  );
};
