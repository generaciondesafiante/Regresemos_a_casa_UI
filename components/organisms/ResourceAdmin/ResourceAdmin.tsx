"use client";
import React, { useEffect, useState } from "react";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import { SearchBar } from "../../molecules/SearchBar/SearchBar";
import styles from "./ResoruceAdmin.module.css";
import { Button } from "../../atoms";
import Link from "next/link";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import { DynamicTable } from "../TableAdmin/TableAdmin";
import { Column, Row } from "../../../types/types/tableAdmin";
import { fetchResourcesData } from "../../../services/resources/resources";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import AdminPencilIcon from "../../atoms/icons/adminPanel/AdminPencilIcon";
import { Resource } from "../../../types/types/Resources";
import { useRouter } from "next/navigation";
import { resourceEditAdmin } from "../../../store/slices/resourceEditAdminSlice";
import Swal from "sweetalert2";

const columns: Column[] = [
  { key: "_id", label: "Id" },
  { key: "title", label: "Nombre" },
  { key: "typeResource", label: "Tipo" },
];

const actionButton = {
  icon: <AdminPencilIcon />,
  label: "Editar",
};

const dropdownOptions = ["todos", "video", "audio", "pdf", "imagen", "link"];

export const ResourceAdmin = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = useAppSelector((state) => state.user.userInfo?.uid);

  const [resources, setresources] = useState([]);
  const [originalResources, setOriginalResources] = useState([]);

  console.log(originalResources);
  function handleSearch(query: string): void {
    throw new Error("Function not implemented.");
  }

  useEffect(() => {
    const dataResource = async () => {
      if (userId) {
        const data = await fetchResourcesData(userId);
        setresources(data.resources); // Establecer recursos filtrados inicialmente
        setOriginalResources(data.resources); // Almacenar todos los recursos
      }
    };
    dataResource();
  }, [userId]);

  const handleEditClick = (resource: any) => {
    if (resource) {
      dispatch(resourceEditAdmin(resource));
    } else {
      Swal.fire(
        "Error",
        "Error para poder editar el recurso, consulte con el administrador.",
        "error"
      );
    }

    router.push(`/dashboard/adminPanel/resources/editResource/${resource._id}`);
  };

  const handleDropdownChange = (value: string) => {
    if (value === "todos") {
      // Cuando seleccionamos "todos", recargamos los recursos originales
      setresources(originalResources); // `originalResources` debe contener los recursos sin filtrar
    } else {
      const resourcesDropDown = originalResources.filter(
        (resource: any) => resource.typeResource === value
      );
      setresources(resourcesDropDown);
    }
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
        <DynamicTable
          columns={columns}
          rows={resources}
          searchQuery={searchQuery}
          actionButton={actionButton}
          dropdownOptions={dropdownOptions}
          dropdownColumnKey="typeResource"
          onDropdownChange={handleDropdownChange}
          onEdit={handleEditClick}
          noDataMessage="No hay recursos disponibles. Por favor, agrega nuevos recursos."
        />
      </section>
    </main>
  );
};
