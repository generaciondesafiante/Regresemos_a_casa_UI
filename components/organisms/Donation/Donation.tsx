"use client";
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

  const handleClick = (href: string) => {
    if (href === "paypal") {
      window.open(
        "https://www.paypal.me/generaciondesafiante",
        "_blank",
        "noopener,noreferrer"
      );
    } else if (href === "others") {
      window.open(
        "https://www.powr.io/checkout_screen?unique_label=5f6bbd82_1620026447",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <>
      <div className={styles["donations-backgroundContainer_info"]}>
        <div className={styles["donations-Container_info"]}>
          <div className={styles["donations-content_info"]}>
            <h2 className={styles["donations-title_info"]}>
              SE PARTE DE UNA GENERACIÓN DESAFIANTE.
            </h2>
            <p className={styles["donations-paragraph_info"]}>
              Este contenido es completamente gratuito. Nos esforzamos por
              difundir la palabra del Señor a los cuatro ángulos de la tierra.
              Siguiendo las palabras de Pablo en su Carta a los Gálatas:{" "}
              <span>
                “El que es enseñado en la palabra haga participe de toda cosa
                buena al que lo instruye”
              </span>
              .
            </p>
            <p className={styles["donations-paragraph_info"]}>
              Gracias por invertir y apoyar este ministerio con
              <b> amor y gozo</b>. Lo mejor de todo, es que eres parte de la
              difusión de las Escrituras.
            </p>
          </div>
          <div className={styles["donations-informations_paymentMethods"]}>
            <p className={styles["donations-paragraph_pymentMethods"]}>
              Puedes contribuir directamente mediante PayPal
            </p>
            <div className={styles["donations-contentButton_paymentMethods"]}>
              <Button
                className={styles["donations-button_pypalme"]}
                onClick={() => handleClick("paypal")}
              >
                Paypal.me
              </Button>
              <Button
                className={`${styles["donations-button_support"]}`}
                onClick={() => handleClick("others")}
              >
                Otros métodos
                <div className={styles["donations-cards_methods"]}>
                  {cards.map((card, index) => (
                    <img src={card.image} alt={card.title} key={index} />
                  ))}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["donations-container_deposit"]}>
        <div className={styles["donations-content_deposit"]}>
          <h2 className={styles["donations-title_deposit"]}>Depósitos</h2>
          <h3 className={styles["donations-title_bank"]}>Banco Santander</h3>
          {deposit.map((data, index) => (
            <div key={index} className={styles["donations-content_dataBank"]}>
              <p className={styles["donations-title_data"]}>{data.title}</p>
              <p className={styles["donations-info_data"]}>{data.info}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
