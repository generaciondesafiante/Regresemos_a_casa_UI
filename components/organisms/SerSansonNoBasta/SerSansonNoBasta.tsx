"use client";
import styles from "./SerSansonNoBasta.module.css";
import  Button  from "@/shared/components/Button/Button";
import { YoutubeIcon } from "../../atoms/icons/home/SocialNetworkIcon/YoutubeIcon";

export const SerSansonNoBasta = () => {

  const handleWhatsApp = () => {
    window.open("https://chat.whatsapp.com/FJJFWGgbslJC4UHIa8b4Ai", "_blank");
  };

  const handleTelegram = () => {
    window.open("https://t.me/GeneracionDesafiante", "_blank");
  };

  return (
    <main className={styles["serSansonNoBasta__container"]}>
      <section className={styles["serSansonNoBasta__info"]}>
        <div className={styles["serSansonNoBasta__info--imgBackground"]}></div>
        <p className={styles["serSansonNoBasta__info--name"]}>
          SER SANSÓN NO BASTA
        </p>
        <p className={styles["serSansonNoBasta__info--description"]}>
          Ser Sansón no basta, <b>un grupo ¡solo para varones!</b> La fuerza, el
          vigor, no son suficiente.
        </p>
      </section>

      <section className={styles["serSansonNoBasta__schedule"]}>
        <div className={styles["serSansonNoBasta__schedule--container"]}>
          <div className={styles["serSansonNoBasta__schedule--contentFirst"]}>
            <div className={styles["serSansonNoBasta__schedule--hoursContent"]}>
              <p className={styles["serSansonNoBasta__schedule--text1"]}>
                Jueves
              </p>
              <p className={styles["serSansonNoBasta__schedule--hour"]}>
                7:00 EC
              </p>
            </div>
            <div className={styles["serSansonNoBasta__schedule--hoursContent"]}>
              <p className={styles["serSansonNoBasta__schedule--text1"]}>
                Viernes
              </p>
              <p className={styles["serSansonNoBasta__schedule--hour"]}>
                06:00 EC
              </p>
            </div>
          </div>
          <div className={styles["serSansonNoBasta__networks"]}>
            <div className={styles["serSansonNoBasta__networksContent"]}>
              <Button
                className={styles["serSansonNoBasta__networksButton--whatsapp"]}
                onClick={() => handleWhatsApp()}
              >
                WhatsApp
              </Button>
              <Button
                className={styles["serSansonNoBasta__networksButton--telegram"]}
                onClick={() => handleTelegram()}
              >
                Telegram
              </Button>
            </div>
          </div>
        </div>
        <div className={styles["serSansonNoBasta__schedule--line"]}></div>
      </section>

      <section className={styles["serSansonNoBasta__leavySlavery"]}>
        <div className={styles["serSansonNoBasta__leavySlavery--Content"]}>
          <img
            src="/serSansonNoBasta/jueves.jpg"
            alt="Fechas reuniones Jueves"
            className={styles["serSansonNoBasta__leavySlavery--img"]}
          />
          <img
            src="/serSansonNoBasta/viernes.jpg"
            alt="Fechas reuniones Viernes"
            className={styles["serSansonNoBasta__leavySlavery--img"]}
          />
        </div>
        <Button className={styles["serSansonNoBasta__leavySlavery--button"]}>
          CHARLAS <YoutubeIcon/>
        </Button>
      </section>

      <section className={styles["serSansonNoBasta__video"]}>
        <div className={styles["serSansonNoBasta__video--titleContent"]}>
          <p className={styles["serSansonNoBasta__video--title"]}>
            Muchas veces ser &quot;
            <span className={styles["serSansonNoBasta__video--textSanson"]}>
              Sansón
            </span>
            &quot; no es suficiente.
          </p>
        </div>
        <div className={styles["serSansonNoBasta__video--container"]}>
          <iframe
            className={styles["serSansonNoBasta__videoSerSanson"]}
            src="https://www.youtube.com/embed/VjDQrONIiS0?si=iDmu-nqubyqN_8xM"
            allowFullScreen
          ></iframe>
        </div>
        <div
          className={styles["serSansonNoBasta__liftWeights--imgBackground"]}
        ></div>
      </section>
    </main>
  );
};
