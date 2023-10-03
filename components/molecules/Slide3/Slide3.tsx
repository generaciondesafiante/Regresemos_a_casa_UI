import styles from "./Slide3.module.css";
export const Slide3 = () => {
  return (
    <section className={styles["carouselThree-container"]}>
      <iframe
        className={styles["carouselThree-video"]}
        src="https://www.youtube.com/embed/D4SSeYfTwWo"
        title="¿QUÉ ES GENERACIÓN DESAFIANTE?"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  );
};
