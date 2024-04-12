"use client";
import styles from "./AboutUs.module.css";

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
                <div className={styles["ourObjetive-bible_background"]}></div>
                <span className={styles["ourObjetive-quote"]}>&quot;</span>
                <p className={styles["ourObjetive-verse"]}>
                    CUANDO USTEDES ME BUSQUEN, USTEDES ME ENCONTRARÁN CON TAL DE QUE ME <b>BUSQUEN DE TODO CORAZÓN.</b>
                </p>
            </div>
            <div className={styles["ourObjetive-paragraph2"]}>
                <p className={styles["ourObjetive-paragraph2_text1"]}>
                    Te contaremos qué programas, libros y diccionarios podrías usar para empezar a estudiar las únicas palabras que pueden transformar nuestras vidas, la voz que nos permitirá encontrar un propósito para despertar cada mañana. Pero si no tienes ninguna pregunta y llegaste aquí de casualidad ¡no hay problema! También te servirá aprender un poco de historia, ciertas palabras en un nuevo idioma y hasta “tips” para vivir. Talvez te des cuenta que el libro más antiguo habla de ti o talvéz no ¿quién sabe? De todas formas no pierdes nada.
                </p>
                <p className={styles["ourObjetive-paragraph2_text2"]}>
                    En fin, lo haremos cortito: somos un grupo de chicos que descubrimos la profundidad y verdad del libro más vendido y menos comprendido del mundo, sin institutos bíblicos, grandes congregaciones o sistemas religiosos. Sin merecerlo nos hallamos dentro del plan de nuestro Dios, el Creador de todo lo que existe. <b>Solo queremos exponer la voz del verdadero y único Pastor porque sabemos que Sus ovejas oirán Su voz.</b>
                </p>
            </div>
        </div>
    )
}
