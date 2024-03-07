import styles from "./PDFView.module.css";
import { ArrowLeftIcon } from "../../atoms/icons/arrowsIcons";
import Link from "next/link";

export const PDFView = () => {
  return (
    <div className={styles["pdfView-container"]}>
      <Link
        href={"/dashboard/courses"}
        className={styles["pdfView-backButton"]}
      >
        <ArrowLeftIcon />
        <p>Regresar</p>
      </Link>
      <h1 className={styles["pdfView-title"]}>Nombre del tema</h1>
      <embed
        className={styles["pdfView-pdf"]}
        src={
          "https://firebasestorage.googleapis.com/v0/b/fir-pdf-43878.appspot.com/o/random.pdf?alt=media&token=07335fa3-498f-451f-adde-aaf01bd9795f"
        }
        type="application/pdf"
      />
    </div>
  );
};
