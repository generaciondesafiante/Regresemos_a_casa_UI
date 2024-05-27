"use client";
import styles from "./SerSansonNoBasta.module.css";


export const SerSansonNoBasta = () => {
    const imageLeavySlavery = "https://static.wixstatic.com/media/d166cc_77d5681914104d7da290460c434a0501~mv2.jpg/v1/fill/w_560,h_312,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Charla2_.jpg";

    const imageExercise = "https://static.wixstatic.com/media/11062b_e4180ddf92ae42b3b2d12dfd51579f36~mv2.jpg/v1/fill/w_640,h_848,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_e4180ddf92ae42b3b2d12dfd51579f36~mv2.jpg";

    return (
        <article className={styles["serSansonNoBasta__container"]}>
            <section className={styles["serSansonNoBasta__info"]}>
                <div className={styles["serSansonNoBasta__info--imgBackground"]}></div>
                <p className={styles["serSansonNoBasta__info--name"]}>SER SANSÓN NO BASTA</p>
                <p className={styles["serSansonNoBasta__info--description"]}>Ser Sansón no basta, <b>un grupo ¡solo para varones!</b> La fuerza, el vigos, no son suficiente.</p>
            </section>

            <section className={styles["serSansonNoBasta__schedule"]}>
                <div className={styles["serSansonNoBasta__schedule--container"]}>
                    <div>
                        <div className={styles["serSansonNoBasta__schedule--hoursContent"]}>
                            <p className={styles["serSansonNoBasta__schedule--text1"]}>MIERCOLES | VIERNES</p>
                            <p className={styles["serSansonNoBasta__schedule--hour"]}>8:00</p>
                        </div>
                        <div className={styles["serSansonNoBasta__schedule--hoursContent"]}>
                            <p className={styles["serSansonNoBasta__schedule--text1"]}>JUEVES</p>
                            <p className={styles["serSansonNoBasta__schedule--hour"]}>05:00</p>
                        </div>
                    </div>

                    <div className={styles["serSansonNoBasta__schedule--hoursContent"]}>
                        <p className={styles["serSansonNoBasta__schedule--text2"]}>DOMINGO</p>
                        <p className={styles["serSansonNoBasta__schedule--hour2"]}>06:00</p>
                    </div>
                </div>
            </section>

            <div className={styles["serSansonNoBasta__networks"]}>
                <div className={styles["serSansonNoBasta__networksContent"]}>
                    <button className={styles["serSansonNoBasta__networksButton--whatsapp"]}>WhatsApp</button>
                    <button className={styles["serSansonNoBasta__networksButton--telegram"]}>Telegram</button>
                </div>
            </div>

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
                        &quot; no es suficiente
                    </p>
                    <img className={styles["serSansonNoBasta__liftWeights"]} src={imageExercise} alt="persona levantando pesas" />
                </div>
                <div className={styles["serSansonNoBasta__video--container"]}>
                    <iframe className={styles["serSansonNoBasta__video"]} width="560" height="315" src="https://www.youtube.com/embed/VjDQrONIiS0?si=iDmu-nqubyqN_8xM" allowFullScreen></iframe>
                </div>
            </section>
        </article>
    )
}
