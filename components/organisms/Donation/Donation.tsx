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
    <section className={styles["donations"]}>
      <div className={styles["donations-backgroundContainer_info"]}>
        <div className={styles["donations-container_info"]}>
          <div className={styles["donations-content_info"]}>
            <h2 className={styles["donations-title_info"]}>
              SE PARTE DE UNA GENERACIÓN DESAFIANTE.
            </h2>
            <p className={styles["donations-paragraph_info"]}>
              Este contenido es totalmente gratuito, tratamos de difundir la
              palabra del Señor a los cuatro ángulos de la tierra. Tomamos la
              palabra que decía Pablo en su Carta a Gálatas “El que es enseñado
              en la palabra haga participe de toda cosa buena al que lo
              instruye”.
            </p>
            <p className={styles["donations-paragraph_info"]}>
              Gracias por invertir y apoyar a este ministerio con
              <b> amor y gozo. Y lo mejor aún</b>, ser parte del esparcimiento
              de las escrituras.
            </p>
          </div>
          <div className={styles["donations-informations_paymentMethods"]}>
            <p className={styles["donations-paragraph_pymentMethods"]}>
              Puedes invertir directamente de PayPal.
            </p>
            <div className={styles["donations-contentButton_paymentMethods"]}>
              <Button className={`${styles["donations-button_pypalme"]}`}>
                Paypal.me
              </Button>
              <Button className={` ${styles["donations-button_support"]}`}>
                Apoya Aquí
              </Button>
            </div>
            <div className={styles["donations-cards_methods"]}>
              {cards.map((card, index) => (
                <img src={card.image} alt={card.title} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["donations-container_deposit"]}>
        <h2 className={styles["donations-title_deposit"]}>Depositos</h2>
        <h3 className={styles["donations-title_bank"]}>Banco Santander</h3>
        {deposit.map((data, index) => (
          <div key={index} className={styles["donations-content_dataBank"]}>
            <p className={styles["donations-title_data"]}>{data.title}</p>
            <p className={styles["donations-info_data"]}>{data.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
