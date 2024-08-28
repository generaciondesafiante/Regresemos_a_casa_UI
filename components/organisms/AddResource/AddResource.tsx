"use client";

import { useRef, useState } from "react";
import styles from "./AddResource.module.css";
import { Button, Input } from "../../atoms";

export const AddResource = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [resourceType, setResourceType] = useState<string>("tipo de recurso");
  const [visibility, setVisibility] = useState<string>("publico");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      title,
      resourceType,
      visibility,
      selectedResourceFile,
      selectedThumbnailFile,
    });
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
            <option value="publico" className={styles["input__option__select"]}>
              Público
            </option>
            <option value="privado" className={styles["input__option__select"]}>
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
              onClick={(e) => {
                e.stopPropagation();
              }}
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
              onClick={(e) => {
                e.stopPropagation();
              }}
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
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </main>
  );
};
