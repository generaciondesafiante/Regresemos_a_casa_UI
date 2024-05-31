import Link from "next/link";
import { FacebookIcon } from "../../atoms/icons/home/SocialNetworkIcon/FacebookSocialNetworksIcon";
import { InstagramIcon } from "../../atoms/icons/home/SocialNetworkIcon/InstagramIcon";
import { YoutubeIcon } from "../../atoms/icons/home/SocialNetworkIcon/YoutubeIcon";
import styles from "./Footer.module.css";
import IconWhatsappLine from "../../atoms/icons/home/SocialNetworkIcon/WhatsappSocilaNetworksIcons";

export const Footer = () => {
  return (
    <section className={styles["footer"]}>
      <div className={styles["footer-soclialNetworks"]}>
        <Link
          href={"https://www.facebook.com/generaciondesafiante"}
          target="_blank"
        >
          <FacebookIcon />
        </Link>
        <Link
          href={
            "https://www.instagram.com/generaciondesafiante_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          }
          target="_blank"
        >
          <div className={styles["footer-middleIcon"]}>
            <InstagramIcon />
          </div>
        </Link>
        <Link
          href={"https://www.youtube.com/c/Generaci%C3%B3ndesafiante"}
          target="_blank"
        >
          <YoutubeIcon />
        </Link>
        <Link
          href={"https://chat.whatsapp.com/El0odapVs7L29LkXVzm6lB"}
          target="_blank"
        >
          <IconWhatsappLine />
        </Link>
      </div>
      <i className={styles["footer-paragraph_italic"]}>
        Su palabra es desafiante
      </i>
    </section>
  );
};
