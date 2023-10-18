import { FC } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styles from "./ResourcesAndVerses.module.css";

export const ResourcesAndVerses: FC = () => {
  return (
    <div className={styles["resourcesAndVerses-container"]}>
      <div className={styles["resourcesAndVerses-content_bibleQuote"]}>
        <p className={styles["resourcesAndVerses-bibleQuote"]}>
          “¡Con razón nuestro corazón ardía, mientras nos hablaba por el camino
          y <span>nos explicaba las Escrituras</span>!”
        </p>
        <p className={styles["resourcesAndVerses-bibleQuote_number"]}>
          LUCAS 24:32
        </p>
      </div>
      <div className={styles["resourcesAndVerses-content_bibleQuoteTwo"]}>
        <p className={styles["resourcesAndVerses-bibleQuoteTwo"]}>
          Las enseñanzas del Señor son perfectas, <span>reavivan el alma</span>.
          Los decretos del Señor son confiables; hacen sabio al sencillo
          <p className={styles["resourcesAndVerses-bibleQuote_number-two"]}>
            SALMO 19:7
          </p>
        </p>
      </div>
      <div className={styles["resourcesAndVerses-content_memorize"]}>
        <p className={styles["resourcesAndVerses-memorize_title"]}>
          Memoriza su palabra
        </p>
        <p>@desafianterecords</p>
        <p>
          <PlayCircleOutlineIcon sx={{ fontSize: 40 }} />
        </p>
      </div>
    </div>
  );
};
