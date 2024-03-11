import Link from "next/link";
import styles from "./(styles)/404.module.css";
import { ArrowLeftIcon } from "../../components/atoms";

const NotFoundPage = () => {
  return (
    <>
      <div className={styles["container"]}>
        <img
          className={styles["not-found_img"]}
          src="https://i.imgur.com/q09T4ke.png"
          alt="Imagen de un error 404"
        />
        <p className={styles["not-found_paragraph"]}>
          La página que estás buscando no existe, <span>vuelve a casa</span>
        </p>
        <Link href="/" className={styles["not-found_linkHome"]}>
        <ArrowLeftIcon />
        <p>Regresar</p>
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
