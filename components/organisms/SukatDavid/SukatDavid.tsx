"use client";
import Link from "next/link";
import { Button } from "../../atoms";
import { WhatsAppIcon } from "../../atoms/icons/whatsAppIcon/WhatsAppIcon";
import { TelegramIcon } from "../../atoms/icons/telegramIcon/TelegramIcon";
import styles from "./SukatDavid.module.css";

export const SukatDavid = () => {
  const imageDeuteronomio =
    "https://firebasestorage.googleapis.com/v0/b/sukatdavid-d0ff8.appspot.com/o/Deuteronomio.webp?alt=media&token=2df3c824-03b0-45b3-8247-6239cb02493d";

  const imageSalmos =
    "https://firebasestorage.googleapis.com/v0/b/sukatdavid-d0ff8.appspot.com/o/Salmos.webp?alt=media&token=b160e2ec-fe21-4f48-a844-beff7c07f711";

  const handleFestividades = () => {
    window.open(
      "https://firebasestorage.googleapis.com/v0/b/sukatdavid-d0ff8.appspot.com/o/pdf%2Ffestividades.pdf?alt=media&token=b73aabdb-71f3-423a-b43a-5fb8e7e69453",
      "_blank"
    );
  };

  const handleOmer = () => {
    window.open(
      "https://firebasestorage.googleapis.com/v0/b/sukatdavid-d0ff8.appspot.com/o/pdf%2Fomer.pdf?alt=media&token=a4428410-638c-4521-b4d7-aac479f5c3d0",
      "_blank"
    );
  };

  return (
    <div className={styles["sukatDavid__container"]}>
      <section className={styles["sukatDavid__info--imgBackground"]}>
        <h3 className={styles["sukatDavid__info--title"]}>SUKAT DAVID</h3>
        <p className={styles["sukatDavid__info--description"]}>
          Sé parte de nuestra <b>comunidad virtual,</b> donde estudiamos verso
          por verso la palabra y compartimos tiempo en comunidad.
        </p>
      </section>
      <section className={styles["sukatDavid__festivities"]}>
        <h4 className={styles["sukatDavid__festivities--title"]}>
          FESTIVIDADES
        </h4>
        <div className={styles["sukatDavid__festivities--buttonContainer"]}>
          <Button
            className={styles["sukatDavid__festivities--button"]}
            onClick={() => handleOmer()}
          >
            Imprime la cuenta del omer
          </Button>
          <Button
            className={styles["sukatDavid__festivities--button"]}
            onClick={() => handleFestividades()}
          >
            PDF | Calendario de Festividades
          </Button>
        </div>
      </section>
      <section className={styles["sukatDavid__schedule"]}>
        <div className={styles["sukatDavid__schedule--container"]}>
          <div className={styles["sukatDavid__schedule--hoursContent"]}>
            <p className={styles["sukatDavid__schedule--hour"]}>17:00 EC</p>
            <p className={styles["sukatDavid__schedule--text"]}>
              <b>VERSO</b> POR VERSO
            </p>
          </div>
        </div>
        <div className={styles["sukatDavid__networks--container"]}>
          <Link
            href={"https://chat.whatsapp.com/El0odapVs7L29LkXVzm6lB"}
            className={styles["sukatDavid__networksButton-link"]}
            target="_blanck"
          >
            <Button className={styles["sukatDavid__networksButton--whatsapp"]}>
              <WhatsAppIcon
                className={styles["sukatDavid__networksButton--whatsAppIcon"]}
              />
              WhatsApp Comunidad
            </Button>
          </Link>
          <Link
            href={"https://t.me/GeneracionDesafiante"}
            className={styles["sukatDavid__networksButton-link"]}
            target="_blanck"
          >
            <Button className={styles["sukatDavid__networksButton--telegram"]}>
              <div
                className={
                  styles["sukatDavid__networksButton--telegram-iconContainer"]
                }
              >
                <TelegramIcon
                  className={styles["sukatDavid__networksButton--telegramIcon"]}
                />
              </div>
              Telegram
            </Button>
          </Link>
        </div>
      </section>
      <section className={styles["sukatDavid__books--container"]}>
        <Link
          href={
            "https://youtube.com/playlist?list=PLX-KKyt726LPrURnoMRWSYvldlQ3b8Kf7&si=bj6DtTAkNffkPRhB"
          }
          target="_blank"
        >
          <img
            className={styles["sukatDavid__books--img"]}
            src={imageDeuteronomio}
            alt="Image book Deuteronomio"
          />
        </Link>
        <Link
          href={
            "https://youtube.com/playlist?list=PLX-KKyt726LMVdJ01eaHz0S5SCZbaKNna&si=giZnDS-sK5ckTdDB"
          }
          target="_blank"
        >
          <img
            className={styles["sukatDavid__books--img"]}
            src={imageSalmos}
            alt="Image book Salmos"
          />
        </Link>
      </section>
    </div>
  );
};
