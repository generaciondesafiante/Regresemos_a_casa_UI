"use client";
import styles from "./AboutUs.module.css";
const="https://static.wixstatic.com/media/b812fcf3f9424a55bd227b8e7dc3ec23.jpg/v1/fill/w_980,h_626,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b812fcf3f9424a55bd227b8e7dc3ec23.jpg"

export const AboutUs = () => {
    return (
        <div className={styles["aboutUs-container"]}>
            <div className={styles["video-container"]}>
                <video controls className={styles["video"]}>
                    <source src="https://video.wixstatic.com/video/d166cc_bf68bc0718e546a6b23f233fb55617fe/1080p/mp4/file.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className={styles["ourObjetive-container"]}>
                <div className={styles["ourObjetive-title"]}>
                    <p className={styles["ourObjetive-our"]}>Nuestro</p>
                    <p className={styles["ourObjetive-objective"]}>objetivo</p>
                </div>
                <div className={styles["ourObjetive-paragraph"]}>
                    <p className={styles["ourObjetive-text1"]}>
                        El <b>objetivo</b> es mostrarte lo que ha cambiado nuestras vidas: estudiar la Biblia palabra por palabra, de tapa a tapa, desde el idioma original, recorriendo la historia para entender cómo se ha llegado hasta aquí, qué tradiciones adoptamos y de dónde. <b>¿Te preguntaste alguna vez por qué crees en lo que crees?</b> Bueno tomate un minuto y piénsalo.
                    </p>
                </div>
            </div>
            <div className={styles["ourObjetive-verse_container"]}>
                <img src=/>
                <p>CUANDO USTEDES ME BUSQUEN, USTEDES ME ENCONTRARÁN CON TAL DE QUE ME BUSQUEN DE TODO CORAZÓN.</p>
            </div>
        </div>
    )
}
