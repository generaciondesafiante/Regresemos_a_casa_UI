"use client";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import styles from "./AddResource.module.css";
import { Button, Input } from "../../atoms";
import { uploadResourceAndThumbnail } from "../../../hooks/useFirebaseCreateResource";
import { addResource } from "../../../services/resources/createResource";
import { useSession } from "next-auth/react";

export const AddResource = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [resourceType, setResourceType] = useState<string>("tipo de recurso");
  const [visibility, setVisibility] = useState<string>("public");
  const [selectedResourceFile, setSelectedResourceFile] = useState<File | null>(
    null
  );
  const [selectedThumbnailFile, setSelectedThumbnailFile] =
    useState<File | null>(null);
  const resourceFileInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleResourceFileButtonClick = () => {
    if (resourceFileInputRef.current) {
      resourceFileInputRef.current.click();
    }
  };

  const handleThumbnailFileButtonClick = () => {
    if (thumbnailFileInputRef.current) {
      thumbnailFileInputRef.current.click();
    }
  };

  const handleResourceFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedResourceFile(file);
    }
  };

  const handleThumbnailFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnailFile(file);
    }
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      description.trim() !== "" &&
      resourceType !== "" &&
      visibility !== "" &&
      selectedResourceFile !== null
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = session?.user.uid;

    if (!userId) {
      Swal.fire(
        "Error",
        "El ID de usuario no está definido. Por favor, inicia sesión.",
        "error"
      );
      return;
    }
    const allowedTypes = ["video", "audio", "image", "pdf", "link"];
    const allowedVisibility = [
      "private",
      "visibleForward",
      "public",
      "restrictedIncourse",
    ];

    if (!allowedTypes.includes(resourceType)) {
      Swal.fire(
        "Error",
        `Tipo de recurso no válido. Debe ser uno de: ${allowedTypes.join(
          ", "
        )}.`,
        "error"
      );
      return;
    }

    if (!allowedVisibility.includes(visibility)) {
      Swal.fire(
        "Error",
        `Tipo de visibilidad no válido. Debe ser uno de: ${allowedVisibility.join(
          ", "
        )}.`,
        "error"
      );
      return;
    }

    if (selectedResourceFile) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Vas a guardar este recurso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardarlo",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { resourceUrl, thumbnailUrl } =
              await uploadResourceAndThumbnail(
                selectedResourceFile,
                selectedThumbnailFile,
                title
              );
            
            const response = await addResource(
              userId, 
              resourceUrl,
              title,
              description,
              resourceType,
              visibility,
              thumbnailUrl || ""
            );
        
            if (response.status === 200) {
              Swal.fire(
                "¡Éxito!",
                "El recurso se ha creado correctamente.",
                "success"
              );
              setTitle("");
              setDescription("");
              setResourceType("video");
              setVisibility("public");
              setSelectedResourceFile(null);
              setSelectedThumbnailFile(null);

              if (resourceFileInputRef.current) {
                resourceFileInputRef.current.value = "";
              }
              if (thumbnailFileInputRef.current) {
                thumbnailFileInputRef.current.value = "";
              }
            } else {
              Swal.fire(
                "Error",
                "Hubo un problema al crear el recurso.",
                "error"
              );
            }
          } catch (error) {
            Swal.fire(
              "Error",
              "Hubo un problema al subir o crear el recurso.",
              "error"
            );
          }
        }
      });
    } else {
      Swal.fire(
        "Error",
        "No se ha seleccionado ningún archivo de recurso",
        "error"
      );
    }
  };

  return (
    <main>
      <h2 className={styles["title__addResource"]}>Agregar recurso</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          isRequire={true}
          placeholder=""
          labelColor="var(--white)"
          inputColor="var(--white)"
          borderColor={"var(--turquoise)"}
        />
        <Input
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="textArea"
          isRequire={true}
          placeholder=""
          labelColor="var(--white)"
          inputColor="var(--white)"
          borderColor={"var(--turquoise)"}
        />
        <div className={styles["container__input"]}>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className={styles.inputOptions}
          >
            <option
              value="tipo de recurso"
              className={styles["input__option__select"]}
            >
              Tipo de recurso
            </option>
            <option value="video" className={styles["input__option__select"]}>
              Video
            </option>
            <option value="audio" className={styles["input__option__select"]}>
              Audio
            </option>
            <option value="imagen" className={styles["input__option__select"]}>
              Imagen
            </option>
            <option value="enlace" className={styles["input__option__select"]}>
              Enlace
            </option>
            <option value="pdf" className={styles["input__option__select"]}>
              PDF
            </option>
          </select>
        </div>

        <div className={styles["container__input"]}>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className={styles.inputOptions}
          >
            <option value="public" className={styles["input__option__select"]}>
              Público
            </option>
            <option value="private" className={styles["input__option__select"]}>
              Privado
            </option>
          </select>
        </div>

        <div className={styles["container__input--select"]}>
          <Button
            onClick={handleResourceFileButtonClick}
            className={styles["button__file--input"]}
          >
            <label className={styles["label-button__file--input"]}>
              Selecciona tu recurso
            </label>
            <input
              type="file"
              accept="*/*"
              ref={resourceFileInputRef}
              className={styles["input__file"]}
              onClick={(e) => e.stopPropagation()}
              onChange={handleResourceFileChange}
            />
          </Button>
          {selectedResourceFile && (
            <span className={styles["name__file--select"]}>
              {selectedResourceFile.name}
            </span>
          )}
        </div>

        <div className={styles["container__input--select"]}>
          <Button
            onClick={handleThumbnailFileButtonClick}
            className={styles["button__file--input"]}
          >
            <label className={styles["label-button__file--input"]}>
              Seleccionar miniatura
            </label>
            <input
              type="file"
              accept="image/*"
              ref={thumbnailFileInputRef}
              className={styles["input__file"]}
              onClick={(e) => e.stopPropagation()}
              onChange={handleThumbnailFileChange}
            />
          </Button>
          {selectedThumbnailFile && (
            <div className={styles["thumbnail-preview"]}>
              <img
                src={URL.createObjectURL(selectedThumbnailFile)}
                alt="Vista previa de la miniatura"
                className={styles["thumbnail-image"]}
              />
            </div>
          )}
        </div>

        <div className={styles["container__buttons--actions"]}>
          <Button className={styles["button__action"]}>Cancelar</Button>
          <Button type="submit" disabled={!isFormValid()}>
            Guardar
          </Button>
        </div>
      </form>
    </main>
  );
};
