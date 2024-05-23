import Link from "next/link";
import { Button } from "../../atoms";
import styles from "./MujeresDeOracion.module.css";

export const MujeresDeOracion = () => {
  const postsShedule = [
    {
      image: "/challengingGroups/womenOfPrayer/shedule-1.webp",
      name: "sheduleOne",
    },
    {
      image: "/challengingGroups/womenOfPrayer/shedule-2.webp",
      name: "sheduleTwo",
    },
    {
      image: "/challengingGroups/womenOfPrayer/shedule-3.webp",
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
          <Link
            href={"https://chat.whatsapp.com/FfXoql2FaD1EJxYmGr1WUO"}
            target="_blank"
            className={styles["mujeresDeOracion-link-buttons_bgTrasnsparent"]}
          >
            WhatsApp
          </Link>
        </Button>
        <Button className={styles["mujeresDeOracion-buttons_bgTrasnsparent"]}>
          <Link
            href={"https://t.me/mujeresdeoracion"}
            target="_blank"
            className={styles["mujeresDeOracion-link-buttons_bgTrasnsparent"]}
          >
            Telegram
          </Link>
        </Button>
        <Button className={styles["mujeresDeOracion-buttons_bgGreen"]}>
          <Link
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLScT80bPLYOCiVoSqwr3s0nhryDEMaHndNlkoi4Fhorb5-DhBg/viewform"
            }
            target="_blank"
            className={styles["mujeresDeOracion-link-buttons_bgGreen"]}
          >
            HAZ TU PEDIDO DE ORACIÓN
          </Link>
        </Button>
      </div>
      <div className={styles["mujeresDeOracion-line"]}></div>
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
