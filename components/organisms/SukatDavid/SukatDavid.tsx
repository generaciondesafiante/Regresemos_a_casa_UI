"use client";
import Link from "next/link";
import { Button } from "../../atoms";
import styles from "./SukatDavid.module.css";

export const SukatDavid = () => {
  const imageDeuteronomio =
    "https://firebasestorage.googleapis.com/v0/b/sukatdavid-d0ff8.appspot.com/o/Deuteronomio.webp?alt=media&token=2df3c824-03b0-45b3-8247-6239cb02493d";

  const imageSalmos =
    "https://firebasestorage.googleapis.com/v0/b/sukatdavid-d0ff8.appspot.com/o/Salmos.webp?alt=media&token=b160e2ec-fe21-4f48-a844-beff7c07f711";

  return (
    <article className={styles["sukatDavid__container"]}>
      <section className={styles["sukatDavid__info"]}>
        <div className={styles["sukatDavid__info--imgBackground"]}></div>
        <p className={styles["sukatDavid__info--name"]}>SUKAT DAVID</p>
        <p className={styles["sukatDavid__info--description"]}>
          Sé parte de nuestra <b>comunidad virtual,</b> donde estudiamos verso
          por verso la palabra y compartimos tiempo en comunidad.
        </p>
      </section>
      <section className={styles["sukatDavid__festivities"]}>
        <span className={styles["sukatDavid__festivities--textFestivities"]}>
          FESTIVIDADES
        </span>
        <Button className={styles["sukatDavid__festivities--button"]}>
          imprime cuenta del omer
        </Button>
        <Button className={styles["sukatDavid__festivities--button"]}>
          PDF | Calendario de Festividades
        </Button>
      </section>
      <section className={styles["sukatDavid__schedule"]}>
        <div className={styles["sukatDavid__schedule--container"]}>
          <div className={styles["sukatDavid__schedule--hoursContent"]}>
            <p className={styles["sukatDavid__schedule--text1"]}>
              <b>VERSO</b> POR VERSO
            </p>
            <p className={styles["sukatDavid__schedule--hour"]}>13:00</p>
            <p className={styles["sukatDavid__schedule--text"]}>
              <b>VERSO</b> POR VERSO
            </p>
          </div>
          <div className={styles["sukatDavid__schedule--hoursContent"]}>
            <p className={styles["sukatDavid__schedule--text1"]}>
              <b>SALMO</b> COMUNIDAD
            </p>
            <p className={styles["sukatDavid__schedule--hour"]}>17:00</p>
            <p className={styles["sukatDavid__schedule--text"]}>
              <b>SALMO</b> COMUNIDAD
            </p>
          </div>
        </div>
        <div className={styles["sukatDavid__networks"]}>
          <div className={styles["sukatDavid__networksContent"]}>
            <Button className={styles["sukatDavid__networksButton--whatsapp"]}>
              <Link
                href={"https://chat.whatsapp.com/El0odapVs7L29LkXVzm6lB"}
                className={styles["sukatDavid__networksButton-link--whatsapp"]}
              >
                WhatsApp Comunidad
              </Link>
            </Button>
            <Button className={styles["sukatDavid__networksButton--telegram"]}>
              <Link
                href={"https://t.me/GeneracionDesafiante"}
                className={styles["sukatDavid__networksButton-link--telegram"]}
              >
                Telegram
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className={styles["sukatDavid__books"]}>
        <div className={styles["sukatDavid__booksContent"]}>
          <Link
            href={
              "https://youtube.com/playlist?list=PLX-KKyt726LPrURnoMRWSYvldlQ3b8Kf7&si=bj6DtTAkNffkPRhB"
            }
            target="_blank"
            className={styles["sukatDavid__books-link--imgDeuteronomio"]}
          >
            <img
              className={styles["sukatDavid__books--imgDeuteronomio"]}
              src={imageDeuteronomio}
              alt="Image book Deuteronomio"
            />
          </Link>
          <Link
            href={
              "https://youtube.com/playlist?list=PLX-KKyt726LMVdJ01eaHz0S5SCZbaKNna&si=giZnDS-sK5ckTdDB"
            }
            target="_blank"
            className={styles["sukatDavid__books-link--imgSalmos"]}
          >
            <img
              className={styles["sukatDavid__books--imgSalmos"]}
              src={imageSalmos}
              alt="Image book Salmos"
            />
          </Link>
        </div>
      </section>
    </article>
  );
};
