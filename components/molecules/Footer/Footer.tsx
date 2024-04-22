import { FacebookIcon } from "../../atoms/icons/home/SocialNetworkIcon/FacebookSocialNetworksIcon";
import { InstagramIcon } from "../../atoms/icons/home/SocialNetworkIcon/InstagramIcon";
import { YoutubeIcon } from "../../atoms/icons/home/SocialNetworkIcon/YoutubeIcon";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <section className={styles["footer"]}>
      <h2 className={styles["footer-title"]}>S Á B A D OS</h2>
      <p className={styles["footer-paragraph"]}>
        <span>Verso por verso </span> 13:00 ARG | YTLive
      </p>
      <p className={styles["footer-paragraph"]}>
        <span>Salmos</span> 17:00 ARG | Zoom
      </p>
      <div className={styles["footer-soclialNetworks"]}>
        <FacebookIcon />
        <div className={styles["footer-middleIcon"]}>
          <InstagramIcon />
        </div>
        <YoutubeIcon />
      </div>
      <i className={styles["footer-paragraph_italic"]}>
        Su palabra es desafiante
      </i>
    </section>
  );
};
