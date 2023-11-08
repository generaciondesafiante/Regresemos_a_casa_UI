import Link from "next/link";
import Image from "next/image";
import icon404 from "../../public/404-2.svg";
import styles from "./(styles)/404.module.css";

const NotFoundPage = () => {
  return (
    <>
      <div className={styles["container"]}>
        <Image
          height={500}
          width={500}
          alt="Image 404"
          src={icon404}
          className={styles["icon-404"]}
        />
        {/* <div className={styles["text-notFound"]}>404 - Página no encontrada</div> */}
        <div className={styles["continer-text-notFound"]}>
          <p className={styles["paragraf-notFound"]}>
            La página que estás buscando no existe.
          </p>
          <Link href="/home" className={styles["link-home_notFound"]}>
            Volver a la página de inicio
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
