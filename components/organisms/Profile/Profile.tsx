"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Button } from "../../atoms";
import { uploadFile } from "../../../hooks/useFirebase";
import { ModalEditPhotoProfile } from "../Modal/Modal";
import { AddPhotoIcon } from "../../atoms/icons/addPhotoIcon/AddPhotoIcon";
import styles from "./Profile.module.css";

interface Props {
  name?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
  country?: string | null | undefined;
  city?: string | null | undefined;
  phone?: number | null | undefined;
  image?: string | null | undefined;
}
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? item : null;
  }
  return null;
};

const setLocalStorageItem = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const Profile: FC<Props> = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [formData, setFormData] = useState(() => {
    const storedData = getLocalStorageItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          name: session?.user?.name ?? "",
          lastname: session?.user?.lastname ?? "",
          email: session?.user?.email ?? "",
          country: session?.user?.country ?? "",
          city: session?.user?.city ?? "",
          phone: session?.user?.phone ?? "",
          image: session?.user?.image ?? "",
        };
  });

  const handleCancelEdit = () => {
    setFormData({
      name: session?.user?.name ?? "",
      lastname: session?.user?.lastname ?? "",
      email: session?.user?.email ?? "",
      country: session?.user?.country ?? "",
      city: session?.user?.city ?? "",
      phone: session?.user?.phone ?? "",
      image: session?.user?.image ?? "",
    });

    setIsEditing(false);
  };

  useEffect(() => {
    setLocalStorageItem("formData", formData);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files ?? [];

    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
  };

  const handleSaveChanges = async (e?: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setIsDisabled(true);
    e?.preventDefault();

    try {
      if (file) {
        const id = session?.user?.uid;

        if (id) {
          const result = await uploadFile(file, id);
          setFormData((formData: {}) => ({
            ...formData,
            image: result,
          }));
        } else {
          console.error("ID is undefined");
        }
      }

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

      const isSuccess = response.ok;

      if (isSuccess) {
        setIsEditing(false);
      }
      setIsLoading(false);
      setIsDisabled(false);

      if (Swal && typeof Swal.fire === "function") {
        const swalOptions: SweetAlertOptions = {
          icon: isSuccess ? "success" : "error",
          title: isSuccess
            ? "Datos actualizados correctamente"
            : "Error al actualizar los datos",
          text: isSuccess
            ? "Dato/s actualizados"
            : "No se actualizaron los datos",
        };
        Swal.fire(swalOptions);
        setIsModalOpen(false);
      }

      return isSuccess;
    } catch (error) {
      setIsLoading(false);
      setIsDisabled(false);
      console.error("Error al actualizar el usuario:", error);
      return false;
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profileContainer-title_img"]}>
        <h2 className={styles["profile-title"]}>Información personal</h2>
        <div className={styles["profile-container_img"]}>
          <img
            src={formData?.image}
            alt="Imagen de perfil"
            className={styles["profile-user_img"]}
          />
          <div
            className={styles["profile-container_addPhoto"]}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <AddPhotoIcon />
          </div>
          <div>
            <ModalEditPhotoProfile
              openModalProfile={isModalOpen}
              closeModalProfile={() => {
                setFile(null);
                setPreviewImage(null);
                setIsModalOpen(false);
              }}
              title="Elegir foto de perfil"
            >
              <form
                onSubmit={handleSaveChanges}
                className={styles["profile-container_modalUploadPhoto"]}
              >
                {previewImage ? (
                  <div className={styles["profile-container_previewImage"]}>
                    <img
                      src={previewImage}
                      alt="Imagen de perfil"
                      className={styles["profile-user_previewImage"]}
                    />
                  </div>
                ) : null}
                <Button
                  className={
                    styles["profile-modalUploadPhoto_buttonUploadPhoto"]
                  }
                >
                  <label className={styles["profile-modalUploadPhoto_label"]}>
                    Selecciona tu foto
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles["profile-modalUploadPhoto_input"]}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      handleFileChange(e);
                      setFile(e.target.files![0]);
                    }}
                  />
                </Button>
                <Button
                  type="submit"
                  className={
                    styles["profile-modalUploadPhoto_buttonSaveChange"]
                  }
                >
                  Guardar cambios
                </Button>
              </form>
            </ModalEditPhotoProfile>
          </div>
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
              className={styles["profile-editInformation_input"]}
            />
            <h3 className={styles["profile-info_title"]}>Apellidos</h3>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className={styles["profile-editInformation_input"]}
            />
            <h3 className={styles["profile-info_title"]}>Correo electrónico</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles["profile-editInformation_input"]}
            />
            <h3 className={styles["profile-info_title"]}>País</h3>
            <input
              type="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={styles["profile-editInformation_input"]}
            />
            <h3 className={styles["profile-info_title"]}>Ciudad</h3>
            <input
              type="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={styles["profile-editInformation_input"]}
            />
            <h3 className={styles["profile-info_title"]}>Teléfono</h3>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles["profile-editInformation_input"]}
            />
            <div className={styles["profile-editInformation_containerButtons"]}>
              <Button
                className={styles["profile-editInformation_saveChangeButton"]}
                type={"submit"}
                onClick={handleSaveChanges}
                loading={isLoading}
                disabled={isDisabled}
                colorLoading="var(--white)"
              >
                Guardar Cambios
              </Button>
              <Button
                type={"button"}
                className={styles["profile-editInformation_cancelButton"]}
                onClick={handleCancelEdit}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles["profile-info_contentPersonalInformation"]}>
              <h3 className={styles["profile-info_title"]}>Nombres</h3>
              <p className={styles["profile-info_personalInformation"]}>
                {formData.name || session?.user?.name}
              </p>
            </div>
            <div className={styles["profile-info_contentPersonalInformation"]}>
              <h3 className={styles["profile-info_title"]}>Apellidos</h3>
              <p className={styles["profile-info_personalInformation"]}>
                {formData.lastname || session?.user?.lastname}
              </p>
            </div>
            <div className={styles["profile-info_contentPersonalInformation"]}>
              <h3 className={styles["profile-info_title"]}>
                Correo electrónico
              </h3>
              <p className={styles["profile-info_personalInformation"]}>
                {formData.email || session?.user?.email}
              </p>
            </div>
            <div className={styles["profile-info_contentPersonalInformation"]}>
              <h3 className={styles["profile-info_title"]}>País</h3>
              <p className={styles["profile-info_personalInformation"]}>
                {formData.country || session?.user?.country}
              </p>
            </div>
            <div className={styles["profile-info_contentPersonalInformation"]}>
              <h3 className={styles["profile-info_title"]}>Ciudad</h3>
              <p className={styles["profile-info_personalInformation"]}>
                {formData.city || session?.user?.city}
              </p>
            </div>
            <div
              className={styles["profile-info_contentPersonalInformation"]}
              style={{
                display:
                  formData.phone || session?.user?.phone !== null
                    ? "block"
                    : "none",
              }}
            >
              <h3 className={styles["profile-info_title"]}>Teléfono</h3>
              <p
                className={styles["profile-info_personalInformation"]}
                style={{
                  display:
                    formData.phone || session?.user?.phone !== null
                      ? "block"
                      : "none",
                }}
              >
                {formData.phone || session?.user?.phone}
              </p>
            </div>
            <div className={styles["profile-containerButtons"]}>
              <Button
                onClick={() => setIsEditing(true)}
                className={styles["profile-buttons"]}
              >
                Editar perfil
              </Button>
              <Link href={"/dashboard/profile/changepassword"}>
                <Button className={styles["profile-buttons"]}>
                  Cambiar contraseña
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
