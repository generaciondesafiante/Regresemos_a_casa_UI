import Link from "next/link";
import { IconYoutube } from "../../atoms/icons/ChallengingRecordsIcons/ChallengingRecordsIcons";
import styles from "./ChallengingRecords.module.css";

export const ChallengingRecords = () => {
  return (
    <section className={styles["challengingRecords"]}>
      <div className={styles["challengingRecords__container--banner"]}>
        <h2 className={styles["challengingRecords__title--banner"]}>
          DESAFIANTE RECORDS
        </h2>
        <p className={styles["challengingRecords__paragraph--banner"]}>
          ¡Que todo lo que respire alabe al Señor! Cantaremos tus alabanzas.
        </p>
      </div>
      <div className={styles["challengingRecords__container--playlist"]}>
        <p className={styles["challengingRecords__paragraph--playlist"]}>
          Encuentra todas nuestras canciones en la Playlist en YouTube
        </p>
        <Link
          href={
            "https://youtube.com/playlist?list=PLX-KKyt726LOVO77-bC3WxO90WY15kDGi&si=DaAcf0vlzmVE1NfG"
          }
          target="_blank"
          className={styles["challengingRecords__link--playlist"]}
        >
          <div
            className={styles["challengingRecords__container-button--playlist"]}
          >
            <p
              className={
                styles["challengingRecords__paragraph-button--playlist"]
              }
            >
              Reproducir
            </p>
            <IconYoutube
              className={styles["challengingRecords__icon-youtube--playlist"]}
            />
          </div>
        </Link>
      </div>
    </section>
  );
};
