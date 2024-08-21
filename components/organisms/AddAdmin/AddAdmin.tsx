"use client";
import React, { useState } from "react";
import { Button, Input } from "../../atoms";
import styles from "./AddAdmin.module.css";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import { useRouter } from "next/navigation";
import { addAdmin } from "../../../services/user/addAdmin";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export const AddAdmin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminEmail(e.target.value);
  };

  const handleClickSaveAdmin = async () => {
    const admin = true;
    const email = adminEmail;
    const id = session?.user.uid || "";
    try {
      const result = await Swal.fire({
        title: "Estás seguro que deseas agregar como administrador a:",
        text: adminEmail,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await addAdmin(email, id, admin);
        if (response.status === 200) {
          Swal.fire(
            "Actualizado!",
            response.data.msg ||
              "Rol de administrador actualizado exitosamente",
            "success"
          );
          router.push("/dashboard/adminPanel/editAdmin");
        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Usuario no encontrado con este email",
            "error"
          );
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(
          "Error!",
          error.message || "No se pudo actualizar el rol",
          "error"
        );
      } else {
        Swal.fire("Error!", "No se pudo actualizar el rol", "error");
      }
    }
  };

  const colorInput = "var(--darkBlue-content)";
  return (
    <main className={styles["addAdmin"]}>
      <section className={styles["content__addAdmin"]}>
        <h2 className={styles["addAdmin__title"]}>Agregar administrador</h2>
        <Input
          id={"admin-email"}
          htmlForm={"admin-email"}
          type="text"
          placeholder=""
          name="adminEmail"
          value={adminEmail}
          onChange={handleEmailChange}
          label={"Correo electronico"}
          isRequire={true}
          labelColor={colorInput}
          inputColor={colorInput}
          buttonColor={colorInput}
          borderColor={colorInput}
        />
        <div className={styles["content__buttons"]}>
          <Button
            className={styles["addAdmin__button"]}
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            className={styles["addAdmin__button"]}
            onClick={handleClickSaveAdmin}
          >
            Agregar
            <AddCircleIcon className={styles["addAdmin__addIcon"]} />
          </Button>
        </div>
      </section>
    </main>
  );
};
