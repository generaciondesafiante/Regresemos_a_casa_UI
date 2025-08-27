import { Menu } from "@/shared/components/Menu/Menu";
import styles from "./styles.module.css";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Menu />

      <main className={styles.authLayout}>
        <section className={styles.left}>{children}</section>
        <section className={styles.right}>
          <Image
            src="/auth/auth-image.png"
            alt="Imagen de bienvenida"
            className={styles.image}
            width={500}
            height={500}
          />
        </section>
      </main>
    </>
  );
};

export default AuthLayout;
