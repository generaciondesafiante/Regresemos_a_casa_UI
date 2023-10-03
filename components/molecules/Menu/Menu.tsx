import Link from "next/link";
import { Button } from "../../atoms/Button/Button";
import styles from "./Menu.module.css";
export const Menu = () => {
  return (
    <header className={styles["header"]}>
      <Link href={"/"}>
        <img
          className={styles["header-logo"]}
          src="https://i.ibb.co/0sXKWB8/Logo11.png"
          alt="Logo generación desafiante"
        />
      </Link>
      <section className={styles["header-container_btn"]}>
        <Link href={"/login"}>
          <Button className={styles["button-sesion"]}> INICIAR SESIÓN </Button>
        </Link>
        <Link href={"/register"}>
          <Button className={styles["button-register"]}> CREAR CUENTA </Button>
        </Link>
      </section>
    </header>
  );
};
