"use client";
import styles from "./SukatDavid.module.css";

export const SukatDavid = () => {
    const imageDeuteronomio = "https://static.wixstatic.com/media/d166cc_37c665df6e2b41c39b75f6b850460d20~mv2.jpg/v1/fill/w_560,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Deuteronomio.jpg";

    const imageSalmos = "https://static.wixstatic.com/media/d166cc_595e9cd9fd6340808fece4079964c2fb~mv2.jpg/v1/fill/w_560,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Salmos.jpg";

    return (
        <article className={styles["sukatDavid__container"]}>
            <section className={styles["sukatDavid__info"]}>
                <div className={styles["sukatDavid__info--imgBackground"]}></div>
                <p className={styles["sukatDavid__info--name"]}>SUKAT DAVID</p>
                <p className={styles["sukatDavid__info--description"]}>Sé parte de nuestra <b>comunidad virtual,</b> donde estudiamos verso por verso la palabra y compartimos tiempo en comunidad.</p>
            </section>
            <section className={styles["sukatDavid__festivities"]}>
                <span className={styles["sukatDavid__festivities--textFestivities"]}>FESTIVIDADES</span>
                <button className={styles["sukatDavid__festivities--button"]}>imprime cuenta del omer</button>
                <button className={styles["sukatDavid__festivities--button"]}>PDF | Calendario de Festividades</button>
            </section>
            <section className={styles["sukatDavid__schedule"]}>
                <div className={styles["sukatDavid__schedule--container"]}>
                    <div className={styles["sukatDavid__schedule--hoursContent"]}>
                        <p className={styles["sukatDavid__schedule--text1"]}><b>VERSO</b> POR VERSO</p>
                        <p className={styles["sukatDavid__schedule--hour"]}>13:00</p>
                        <p className={styles["sukatDavid__schedule--text"]}><b>VERSO</b> POR VERSO</p>
                    </div>
                    <div className={styles["sukatDavid__schedule--hoursContent"]}>
                        <p className={styles["sukatDavid__schedule--text1"]}><b>SALMO</b> COMUNIDAD</p>
                        <p className={styles["sukatDavid__schedule--hour"]}>17:00</p>
                        <p className={styles["sukatDavid__schedule--text"]}><b>SALMO</b> COMUNIDAD</p>
                    </div>
                </div>
                <div className={styles["sukatDavid__networks"]}>
                    <div className={styles["sukatDavid__networksContent"]}>
                        <button className={styles["sukatDavid__networksButton--whatsapp"]}>WhatsApp Comunidad</button>
                        <button className={styles["sukatDavid__networksButton--telegram"]}>Telegram</button>
                    </div>
                </div>
            </section>
            <section className={styles["sukatDavid__books"]}>
                <div className={styles["sukatDavid__booksContent"]}>
                    <img className={styles["sukatDavid__books--imgDeuteronomio"]} src={imageDeuteronomio} alt="Image book Deuteronomio" />
                    <img className={styles["sukatDavid__books--imgSalmos"]} src={imageSalmos} alt="Image book Salmos" />
                </div>
            </section>
        </article>
    )
}
