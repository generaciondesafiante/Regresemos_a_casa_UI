import { FacebookIcon } from "../../atoms/icons/home/SocialNetworkIcon/FacebookSocialNetworksIcon";
import { InstagramIcon } from "../../atoms/icons/home/SocialNetworkIcon/InstagramIcon";
import { YoutubeIcon } from "../../atoms/icons/home/SocialNetworkIcon/YoutubeIcon";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <section className={styles["container-footer"]}>
      <h2 className={styles['title-footer']}>S Á B A D OS</h2>
      <p className={styles['paragraph-footer']}> <span>Verso por verso </span> 13:00 ARG | YTLive</p>
      <p className={styles['paragraph-footer']}> <span>Salmos</span> 17:00 ARG | Zoom</p>
      <div className={styles["soclialNetworks-footer"]}>
        <FacebookIcon />
        <InstagramIcon />
        <YoutubeIcon />
      </div>
      <i className={styles['paragraph-footer-italic']}>Su palabra es desafiante</i>
    </section>
  );
};
