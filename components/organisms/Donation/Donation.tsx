import { Button } from "../../atoms";
import styles from "./Donation.module.css";

export const Donation = () => {
  const deposit = [
    { title: "Número de cuenta:", info: "Cuentas en Pesos 000-648787/2" },
    { title: "Número de CBU:", info: "Cuentas en Pesos 000-648787/2" },
    { title: "Alias: ", info: "COLLAR.CICLO.GAS" },
    { title: "Titular de la cuenta:", info: "Lopez Palacios Milka Daniela" },
    { title: "Documento:", info: "DNI EXTRANJERO - 95626124" },
  ];

  const cards = [
    { title: "amex", image: "/donations/Cards/amex.svg" },
    { title: "discover", image: "/donations/Cards/discover.svg" },
    { title: "mastercard", image: "/donations/Cards/mastercard.svg" },
    { title: "paypal", image: "/donations/Cards/paypal.svg" },
    { title: "visa", image: "/donations/Cards/visa.svg" },
  ];

  return (
    <section className={styles["donation-container"]}>
      <div className={styles["donation-information_backgroundContainer"]}>
        <div className={styles["donation-info_container"]}>
        <div className={styles["info-content"]}>
          <h2 className={styles["title-info"]}>
            SE PARTE DE UNA GENERACIÓN DESAFIANTE.
          </h2>
          <p className={styles["paragraph-info"]}>
            Este contenido es totalmente gratuito, tratamos de difundir la
            palabra del Señor a los cuatro ángulos de la tierra. Tomamos la
            palabra que decía Pablo en su Carta a Gálatas “El que es enseñado en
            la palabra haga participe de toda cosa buena al que lo instruye”.
          </p>
          <p className={styles["paragraph-info"]}>
            Gracias por invertir y apoyar a este ministerio con
            <b> amor y gozo. Y lo mejor aún</b>, ser parte del esparcimiento de
            las escrituras.
          </p>
        </div>
        <div className={styles["content-information_payment-methods"]}>
          <p className={styles["payment-methods_paragraph"]}>
            Puedes invertir directamente de PayPal.
          </p>
          <div className={styles["methods-button_content"]}>
            <Button className={`${styles["paypalme-button"]}`}>
              Paypal.me
            </Button>
            <Button className={` ${styles["support-button"]}`}>
              Apoya Aquí
            </Button>
          </div>
          <div className={styles["payment-methods_cards"]}>
            {cards.map((card, index) => (
              <img src={card.image} alt={card.title} key={index} />
            ))}
          </div>
          </div>
        </div>
      </div>
      <div className={styles["deposit-container"]}>
        <h2 className={styles["deposit-title"]}>Depositos</h2>
        <h3 className={styles["bank-title"]}>Banco Santander</h3>
        {deposit.map((data, index) => (
          <div key={index} className={styles["bank-data_content"]}>
            <p className={styles["data-title"]}>{data.title}</p>
            <p className={styles["data-info"]}>{data.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
