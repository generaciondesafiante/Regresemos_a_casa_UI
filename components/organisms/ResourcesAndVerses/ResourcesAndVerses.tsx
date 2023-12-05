import { FC } from "react";
import { ArrowPlayMusic } from "../../atoms/icons/arrowsIcons/ArrowPlayMusic";
import styles from "./ResourcesAndVerses.module.css";

export const ResourcesAndVerses: FC = () => {
  return (
    <div className={styles["resourcesAndVerses-container"]}>
      <div className={styles["resourcesAndVerses-bibleVerseContainerA"]}>
        <p className={styles["resourcesAndVerses-bibleVerseContainerA_verse"]}>
          “¡Con razón nuestro corazón ardía, mientras nos hablaba por el camino
          y nos explicaba las Escrituras!”
        </p>
        <p
          className={
            styles["resourcesAndVerses-bibleVerseContainerA_verseIndex"]
          }
        >
          LUCAS 24:32
        </p>
      </div>
      <div className={styles["resourcesAndVerses-bibleVerseContainerB"]}>
        <p className={styles["resourcesAndVerses-bibleVerseContainerB_verse"]}>
          Las enseñanzas del Señor son perfectas, reavivan el alma. Los decretos
          del Señor son confiables; hacen sabio al sencillo
        </p>
        <p
          className={
            styles["resourcesAndVerses-bibleVerseContainerB_verseIndex"]
          }
        >
          SALMO 19:7
        </p>
      </div>
      <a
        className={styles["resourcesAndVerses-playerListLink"]}
        target="_blank"
        href="https://www.youtube.com/watch?v=pQPoX4WRUW0&list=PLX-KKyt726LOVO77-bC3WxO90WY15kDGi"
      >
        <div className={styles["resourcesAndVerses-playerListContainer"]}>
          <h3 className={styles["resourcesAndVerses-playerListContainer_text"]}>
            <span>Memoriza</span> su palabra
          </h3>
          <div
            className={styles["resourcesAndVerses-playerListContainer_child"]}
          >
            <p
              className={styles["resourcesAndVerses-playerListContainer_text"]}
            >
              @desafianterecords
            </p>
            <button
              className={
                styles["resourcesAndVerses-playerListContainer_playBtn"]
              }
            >
              <ArrowPlayMusic
                className={
                  styles["resourcesAndVerses-playerListContainer_playBtnIcon"]
                }
              />
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};
