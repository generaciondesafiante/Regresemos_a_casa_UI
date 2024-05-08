import styles from "./ChallengingRecords.module.css";

export const ChallengingRecords = () => {
  return (
    <section className={styles["challengingRecords"]}>
      <div className={styles["challengingRecords__container--banner"]}>
        <h2 className={styles['challengingRecords__title--banner']}>DESAFIANTE RECORDS</h2>
        <p className={styles['challengingRecords__paragraph--banner']}>
          ¡Que todo lo que respire alabe al Señor! Cantaremos tus alabanzas.
        </p>
      </div>
    </section>
  );
};
