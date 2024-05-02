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
    <section className={styles["mujeresDeOracion"]}>
      <div className={styles["mujeresDeOracion_welcome"]}>
        <h2 className={styles["mujeresDeOracion-title_welcome"]}>
          MUJERES DE ORACIÓN
        </h2>
        <p className={styles["mujeresDeOracion-paragraph_welcome"]}>
          ¡Bienvenida a este <b>grupo de mujeres virtuosas</b> que lo único que
          anhelan es agradarle al Padre!
        </p>
      </div>
      <div className={styles["mujeresDeOracion-buttons"]}>
        <Button className={styles["mujeresDeOracion-buttons_bgTrasnsparent"]}>
          WhatsApp
        </Button>
        <Button className={styles["mujeresDeOracion-buttons_bgTrasnsparent"]}>
          Telegram
        </Button>
        <Button className={styles["mujeresDeOracion-buttons_bgGreen"]}>
          HAZ TU PEDIDO DE ORACIÓN
        </Button>
      </div>
      <div className={styles['mujeresDeOracion-line']}></div>
      <div className={styles["mujeresDeOracion-content_postsShedule"]}>
        {postsShedule.map((shedule, index) => (
          <img
            src={shedule.image}
            alt={shedule.image}
            key={index}
            className={styles["mujeresDeOracion-image_postsShedule"]}
          />
        ))}
      </div>
    </section>
  );
};
