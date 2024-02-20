"use client";
import styles from "./Viewpdf.module.css"
import { ArrowLeftIcon } from "../../atoms/icons/arrowsIcons";

export const Viewpdf = () => {
    return (
        <div className={styles["viewpdf-container"]}>
            <div className={styles["viewpdf-containerBackButton"]}>
                <button className={styles["viewpdf-backButton"]}>
                    <ArrowLeftIcon />
                    <p>Regresar</p>
                </button>
            </div>
            <h1 className={styles["viewpdf-title"]}>Nombre del tema</h1>
            <div className={styles["container-pdf"]}>
                <embed className={styles["pdf"]} src={"https://firebasestorage.googleapis.com/v0/b/fir-pdf-43878.appspot.com/o/random.pdf?alt=media&token=07335fa3-498f-451f-adde-aaf01bd9795f"} type="application/pdf"/>
            </div>
        </div>
    )
}