import { Button } from "../../atoms";
import styles from "./MujeresDeOracion.module.css";

export const MujeresDeOracion = () => {
  const postsShedule = [
    {
      image: "/gruposDesafiantes/mujeresDeOracion/shedule-1.webp",
      name: "sheduleOne",
    },
    {
      image: "/gruposDesafiantes/mujeresDeOracion/shedule-2.webp",
      name: "sheduleTwo",
    },
    {
      image: "/gruposDesafiantes/mujeresDeOracion/shedule-3.webp",
      name: "sheduleThree",
    },
  ];

  return (
    <section className={styles["MujeresDeOracion"]}>
      <div className={styles["MujeresDeOracion_welcome"]}>
        <h2 className={styles["MujeresDeOracion-title_welcome"]}>
          MUJERES DE ORACIÓN
        </h2>
        <p className={styles["MujeresDeOracion-paragraph_welcome"]}>
          ¡Bienvenida a este <b>grupo de mujeres virtuosas</b> que lo único que
          anhelan es agradarle al Padre!
        </p>
      </div>
      <div className={styles["MujeresDeOracion-buttons"]}>
        <Button className={styles["MujeresDeOracion-buttons_bgTrasnsparent"]}>
          WhatsApp
        </Button>
        <Button className={styles["MujeresDeOracion-buttons_bgTrasnsparent"]}>
          Telegram
        </Button>
        <Button className={styles["MujeresDeOracion-buttons_bgGreen"]}>
          HAZ TU PEDIDO DE ORACIÓN
        </Button>
      </div>
      <div className={styles["MujeresDeOracion-content_postsShedule"]}>
        {postsShedule.map((shedule, index) => (
          <img
            src={shedule.image}
            alt={shedule.image}
            key={index}
            className={styles["MujeresDeOracion-image_postsShedule"]}
          />
        ))}
      </div>
    </section>
  );
};
