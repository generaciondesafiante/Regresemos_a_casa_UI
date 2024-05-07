import { dataProverbiosImages } from "./dataProverbiosImages";
import styles from "./ProverbiosImages.module.css";

export const ProverbiosImages = () => {
  return (
    <section className={styles["proverbiosImagenes"]}>
      <div className={styles['proverbiosImagenes-content']}>
        {dataProverbiosImages.map((image, index) => (
          <img
            src={image.images}
            alt={image.name}
            key={index}
            className={styles["proverbiosImagenes-image"]}
          />
        ))}
      </div>
    </section>
  );
};
