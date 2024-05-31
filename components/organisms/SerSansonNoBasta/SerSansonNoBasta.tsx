"use client"
import styles from "./SerSansonNoBasta.module.css";
import { Button } from '../../atoms/Button/Button';


export const SerSansonNoBasta = () => {
    const imageLeavySlavery = "https://static.wixstatic.com/media/d166cc_77d5681914104d7da290460c434a0501~mv2.jpg/v1/fill/w_560,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Charla2_.jpg"

    return (
        <article className={styles["serSansonNoBasta__container"]}>
            <section className={styles["serSansonNoBasta__info"]}>
                <div className={styles["serSansonNoBasta__info--imgBackground"]}></div>
                <p className={styles["serSansonNoBasta__info--name"]}>SER SANSÓN NO BASTA</p>
                <p className={styles["serSansonNoBasta__info--description"]}>Ser Sansón no basta, <b>un grupo ¡solo para varones!</b> La fuerza, el vigor, no son suficiente.</p>
            </section>

            <section className={styles["serSansonNoBasta__schedule"]}>
                <div className={styles["serSansonNoBasta__schedule--container"]}>
                    <div className={styles["serSansonNoBasta__schedule--contentFirst"]}>
                        <div className={styles["serSansonNoBasta__schedule--hoursContent"]}>
                            <p className={styles["serSansonNoBasta__schedule--text1"]}>MIERCOLES | VIERNES</p>
                            <p className={styles["serSansonNoBasta__schedule--hour"]}>8:00</p>
                        </div>
                        <div className={styles["serSansonNoBasta__schedule--hoursContent"]}>
                            <p className={styles["serSansonNoBasta__schedule--text1"]}>JUEVES</p>
                            <p className={styles["serSansonNoBasta__schedule--hour"]}>05:00</p>
                        </div>
                    </div>
                    <div className={styles["serSansonNoBasta__schedule--contentSecond"]}>
                        <div className={styles["serSansonNoBasta__schedule--hoursContent2"]}>
                            <p className={styles["serSansonNoBasta__schedule--text1"]}>DOMINGO</p>
                            <p className={styles["serSansonNoBasta__schedule--hour"]}>06:00</p>
                        </div>
                    </div>
                    <div className={styles["serSansonNoBasta__networks"]}>
                        <div className={styles["serSansonNoBasta__networksContent"]}>
                            <Button className={styles["serSansonNoBasta__networksButton--whatsapp"]}>WhatsApp</Button>
                            <Button className={styles["serSansonNoBasta__networksButton--telegram"]}>Telegram</Button>
                        </div>
                    </div>
                </div>
                <div className={styles["serSansonNoBasta__schedule--line"]}></div>
            </section>


            <section className={styles["serSansonNoBasta__leavySlavery"]}>
                <div className={styles["serSansonNoBasta__leavySlavery--Content"]}>
                    <a href="https://www.youtube.com/playlist?list=PLX-KKyt726LPGYDWVa3lrG8zSmBYOiQdA" target="_blank" rel="noopener noreferrer">
                        <img className={styles["serSansonNoBasta__leavySlavery--img"]} src={imageLeavySlavery} alt="Image ¿como dejar de ser esclavo de tus ojos?" />
                    </a>
                    <a href="https://www.youtube.com/playlist?list=PLX-KKyt726LPGYDWVa3lrG8zSmBYOiQdA" target="_blank" rel="noopener noreferrer">
                        <button className={styles["serSansonNoBasta__leavySlavery--button"]}>CHARLAS &gt;</button>
                    </a>
                </div>
            </section>

            <section className={styles["serSansonNoBasta__video"]}>
                <div className={styles["serSansonNoBasta__video--titleContent"]}>
                    <p className={styles["serSansonNoBasta__video--title"]}>Muchas veces ser &quot;
                        <span className={styles["serSansonNoBasta__video--textSanson"]}>Sansón</span>
                        &quot; no es suficiente.
                    </p>
                </div>
                <div className={styles["serSansonNoBasta__video--container"]}>
                    <iframe className={styles["serSansonNoBasta__videoSerSanson"]} src="https://www.youtube.com/embed/VjDQrONIiS0?si=iDmu-nqubyqN_8xM" allowFullScreen></iframe>
                </div>
                <div className={styles["serSansonNoBasta__liftWeights--imgBackground"]}></div>
            </section>
        </article>
    )
}