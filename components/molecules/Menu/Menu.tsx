import Link from "next/link";
import { Button } from "../../atoms";
import styles from "./Menu.module.css";

export const Menu: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <img
          className={styles["header-logo"]}
          src="https://i.imgur.com/B0R1LHJ.png"
          alt="Logo generación desafiante"
        />
      </Link>
      <section className={styles["header-container_btn"]}>
        <Link href={"/loginPage"}>
          <Button className={styles["button-sesion"]} type="text">
            ACCEDER
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button className={styles["button-register"]} type="text">
            REGISTRARSE
          </Button>
        </Link>
      </section>
    </header>
  );
};
