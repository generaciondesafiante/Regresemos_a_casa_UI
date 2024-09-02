"use client";
import React from "react";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import styles from "./ResoruceAdmin.module.css";
import { Button } from "../../atoms";
import Link from "next/link";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";

export const ResourceAdmin = () => {
  const handleSearch = (query: string) => {
    // Here you can handle the search logic, such as making a request to an API
  };
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
          <SearchBar onSearch={handleSearch} />
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
      </section>
    </main>
  );
};
