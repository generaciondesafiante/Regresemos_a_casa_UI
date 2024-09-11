"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "../../atoms";
import styles from "./AddAdmin.module.css";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import { useRouter } from "next/navigation";
import { addAdmin } from "../../../services/user/addAdmin";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store/store";
import { fetchAdmins } from "../../../store/slices/allAdminsSlice";
import ConditionalRenderer from "../../../feature/BlockedComponentsPublicsFeatureFlags/conditionalRenderComponentsPublics";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const AddAdmin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [adminEmail, setAdminEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const isButtonEnabled = isValidEmail;
  const colorInput = "var(--darkBlue-content)";

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminEmail(e.target.value);

    const isValid = emailRegex.test(e.target.value);
    setIsValidEmail(isValid);
  };

  const handleClickSaveAdmin = async () => {
    const admin = true;
    const email = adminEmail;
    const id = session?.user.uid || "";
    if (!isValidEmail) {
      Swal.fire(
        "Error",
        "Por favor, ingresa un correo electrónico válido.",
        "error"
      );
      return;
    }
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
          toast.success(
            response.data.msg || "Administrador agregado exitosamente"
          );
          dispatch(fetchAdmins(id));
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
  useEffect(() => {
    setIsValidEmail(emailRegex.test(adminEmail));
  }, [adminEmail]);

  return (
    <ConditionalRenderer viewName="addAdmin">
      {" "}
      <main className={styles["content__addAdmin"]}>
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
            className={`${styles["addAdmin__button"]} ${styles["addAdmin__button--delete"]}`}
            onClick={() => router.push("/dashboard/adminPanel/editAdmin")}
          >
            Cancelar
          </Button>
          <Button
            className={`${styles["addAdmin__button"]} ${
              styles["addAdmin__button--add"]
            } ${isButtonEnabled ? "" : styles["addAdmin__button--disabled"]}`}
            onClick={handleClickSaveAdmin}
            disabled={!isButtonEnabled}
          >
            Agregar
            <AddCircleIcon className={styles["addAdmin__addIcon"]} />
          </Button>
        </div>
      </main>
    </ConditionalRenderer>
  );
};
