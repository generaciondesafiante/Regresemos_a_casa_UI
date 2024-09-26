import React from "react";
import { Button, Input } from "../../atoms";
import styles from "./EditResourceAdmin.module.css";

export const EditResourceAdmin = () => {
  return (
    <main>
      <h2 className={styles["title__addResource"]}>Agregar recurso</h2>
      <form className={styles.form}>
        <Input
          label="Título"
       
          type="text"
          isRequire={true}
          placeholder=""
          labelColor="var(--white)"
          inputColor="var(--white)"
          borderColor={"var(--turquoise)"}
        />
        <Input
          label="Descripción"
       
          type="textArea"
          isRequire={true}
          placeholder=""
          labelColor="var(--white)"
          inputColor="var(--white)"
          borderColor={"var(--turquoise)"}
        />
        <div className={styles["container__input"]}>
          <select
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
            className={styles["button__file--input"]}
          >
            <label className={styles["label-button__file--input"]}>
              Selecciona tu recurso
            </label>
            <input
              type="file"
              accept="*/*"
              className={styles["input__file"]}
              onClick={(e) => e.stopPropagation()}
            />
          </Button>
            <span className={styles["name__file--select"]}>
            </span>
        </div>

        <div className={styles["container__input--select"]}>
          <Button
            className={styles["button__file--input"]}
          >
            <label className={styles["label-button__file--input"]}>
              Seleccionar miniatura
            </label>
            <input
              type="file"
              accept="image/*"
              className={styles["input__file"]}
              onClick={(e) => e.stopPropagation()}
            />
          </Button>
            <div className={styles["thumbnail-preview"]}>
              <img
                src={URL.createObjectURL(selectedThumbnailFile)}
                alt="Vista previa de la miniatura"
                className={styles["thumbnail-image"]}
              />
            </div>
        </div>

        <div className={styles["container__buttons--actions"]}>
          <Button className={styles["button__action"]}>Cancelar</Button>
          <Button type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </main>
  );
};
