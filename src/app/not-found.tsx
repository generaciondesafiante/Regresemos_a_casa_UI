import Link from "next/link";
import styles from "./(styles)/404.module.css";
import { Button } from "../../components/atoms/Button/Button";

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
        <Button className={styles["not-found_button_LinkHome"]}>
          <Link href="/" className={styles["not-found_linkHome"]}>
            Ir a inicio
          </Link>
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;
