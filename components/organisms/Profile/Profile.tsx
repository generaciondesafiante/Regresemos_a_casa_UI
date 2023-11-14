"use client";
import { FC, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Swal from "sweetalert2";
import { Button, Input } from "../../atoms";
import { ModalEditPhotoProfile } from "../Modal/Modal";
import styles from "./Profile.module.css";

interface Props {
  name?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
  country?: string | null | undefined;
  city?: string | null | undefined;
  phone?: number | null | undefined;
}

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const Profile: FC<Props> = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(password);
  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const myLabelColor = "#234e67";
  const myInputColor = "#234e67";

  const [formData, setFormData] = useState({
    name: session?.user?.name ?? "",
    lastname: session?.user?.lastname ?? "",
    email: session?.user?.email ?? "",
    country: session?.user?.country ?? "",
    city: session?.user?.city ?? "",
    phone: session?.user?.phone ?? "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      currentPassword: e.target.value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      confirmPassword: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    console.log("FormData before request:", formData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/edit-profile/${session?.user?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Datos actualizados correctamente",
          text: "Dato/s actualizados",
        });
      } else {
        // Maneja errores del servidor
        Swal.fire({
          icon: "success",
          title: "No se han actualizado correctamente los datos",
          text: "No se actualizaron los datos",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const changePassword = async () => {
    try {
      // Verifica si las contraseñas nuevas son iguales
      if (password !== confirmPassword) {
        console.log("Las contraseñas nuevas no coinciden");
        return;
      }

      const responseValidate = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/validate-password/${session?.user?.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: currentPassword, // Send the current password for validation
          }),
        }
      );

      if (responseValidate.ok) {
        // Contraseña actual válida, la nueva contraseña y la confirmación son iguales

        // Fetch to update the password
        const responseUpdate = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password/${session?.user?.uid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
            }),
          }
        );

        if (responseUpdate.ok) {
          // Password successfully updated
          console.log("Contraseña actualizada correctamente");
        } else {
          console.log("Error al actualizar la contraseña");
        }
      } else {
        console.log("La contraseña actual no es correcta");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profileContainer-title_img"]}>
        <h2 className={styles["profile-title"]}>Información personal</h2>
        {/* -------------MODAL EDIT PHOTO PROFILE -------------*/}
        <div className={styles["profile-container_img"]}>
          <img
            src={session?.user?.image || "URL_DE_IMAGEN_POR_DEFECTO"}
            alt="Imagen de perfil"
            className={styles["profile-user_img"]}
          />
          <div
            className={styles["profile-container_addPhoto"]}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <AddAPhotoIcon
              className={styles["profile-add-photo_icon"]}
              onClick={handleOpenModal}
            />
          </div>

          <div>
            <ModalEditPhotoProfile
              openModalProfile={isModalOpen}
              closeModalProfile={() => {
                setIsModalOpen(false);
              }}
              title="Agrega foto de perfil"
            >
              <form className={styles["modalEditImg-content"]}>
                <h3 className={styles["modalEditImg-title"]}>Subir Imagen</h3>

                <div className={styles["custom-file-input"]}>
                  <span className={styles["file-input-label"]}>
                    {/* {selectedFile
                      ? Has seleccionado el archivo: ${selectedFile.name}
                      : "Seleccionar archivo"} */}
                    Seleccionar archivo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles["modalEditImg-inputUploadImage"]}
                    // onChange={(e) => {
                    //   handleInputChange(e);
                    //   setSelectedFile(e.target.files[0]);
                    // }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <button
                  // onClick={(e) => {
                  //   handleSaveChanges(e);
                  //   handleFileChange(e);
                  // }}
                  className={styles["modalEditImg-buttonAccept"]}
                >
                  Guardar cambios
                </button>
              </form>
            </ModalEditPhotoProfile>
          </div>
        </div>
        {/* -------------------- CLOSE MODAL EDIT PHOTO PROFILE------------------------- */}
      </div>
      <div className={styles["Container-changePassword"]}>
        <div>
          <ModalEditPhotoProfile
            openModalProfile={isChangePasswordModalOpen}
            closeModalProfile={handleCloseChangePasswordModal}
            title="Cambiar Contraseña"
          >
            <form className={styles["modalChangePassword-content"]}>
              <Input
                type={"password"}
                id="currentPassword"
                htmlForm="currentPassword"
                name="currentPassword"
                placeholder=" "
                label="Contraseña Actual"
                className={styles["input-changePassword"]}
                labelColor={myLabelColor}
                inputColor={myInputColor}
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              <Input
                type="password"
                id="password"
                htmlForm="password"
                name="password"
                placeholder=""
                label="Nueva Contraseña"
                className={styles["input-changePassword"]}
                labelColor={myLabelColor}
                inputColor={myInputColor}
                value={password}
                onChange={handlePasswordChange}
              />

              <Input
                type="password"
                id="confirmPassword"
                htmlForm="confirmPassword"
                name="confirmPassword"
                placeholder=""
                label="Confirmar Contraseña"
                className={styles["input-changePassword"]}
                labelColor={myLabelColor}
                inputColor={myInputColor}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              <Button
                type={"submit"}
                className={styles["button-changePassword"]}
                onClick={changePassword}
              >
                Guardar Cambios
              </Button>
              <button
                onClick={() => setIsEditing(false)}
                className={`
                ${styles["profile-saveChange_btn"]} 
                ${styles["profile-cancel_btn"]}`}
              >
                Cancelar
              </button>
            </form>
          </ModalEditPhotoProfile>
        </div>
      </div>

      <div className={styles["profile-container_info"]}>
        {isEditing ? (
          <div className={styles["profile-content_editInformation"]}>
            <h3 className={styles["profile-info_title"]}>Nombres</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Apellidos</h3>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Correo electrónico</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>País</h3>
            <input
              type="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Ciudad</h3>
            <input
              type="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Teléfono</h3>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <div className={styles["container-buttons"]}>
              <Button
                className={styles["profile-saveChange_btn"]}
                type={"submit"}
                onClick={handleSaveChanges}
              >
                Guardar Cambios
              </Button>
              <Button
                type={"text"}
                // onClick={() => setIsEditing(false)}
                className={`
                ${styles["profile-saveChange_btn"]} 
                ${styles["profile-cancel_btn"]}`}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Nombres</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.name}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Apellidos</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.lastname}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>
                Correo electrónico
              </h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.email}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>País</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.country}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Ciudad</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.city}
              </p>
            </div>
            <div
              className={styles["viewDesktop_profile"]}
              style={{ display: formData.phone !== null ? "block" : "none" }}
            >
              <h3 className={styles["profile-info_title"]}>Teléfono</h3>
              <p
                className={styles["profile-user_personalInfo"]}
                style={{
                  display: formData.phone !== null ? "block" : "none",
                }}
              >
                {formData.phone}
              </p>
            </div>
            <div className={styles["profile-container_buttons"]}>
              <button
                onClick={() => setIsEditing(true)}
                className={styles["profile-btn"]}
              >
                Editar perfil
              </button>
              <button
                className={styles["profile-btn"]}
                onClick={handleOpenChangePasswordModal}
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
