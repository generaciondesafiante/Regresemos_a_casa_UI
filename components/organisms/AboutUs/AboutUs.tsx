"use client";
import styles from "./AboutUs.module.css";

export const AboutUs = () => {
    const imagenLincolns = "https://static.wixstatic.com/media/d166cc_511a94f7936d4713b4906a3194d7f30c~mv2.jpg/v1/crop/x_283,y_60,w_994,h_1020/fill/w_166,h_172,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/30743886_2126087857670517_61279119260652.jpg";

    const imagenAbigailMichell = "https://static.wixstatic.com/media/d166cc_141257b4382346d3a80798efa1cf09c4~mv2.jpg/v1/crop/x_129,y_49,w_440,h_521/fill/w_134,h_156,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/54517632_2414760852078060_82520352340574.jpg";

    const imagenDanielaLopez = "https://static.wixstatic.com/media/d166cc_065bdcc8edf34430a0341c1ba9fd48d7~mv2.jpg/v1/crop/x_219,y_0,w_2586,h_3132/fill/w_142,h_172,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Milka%20Daniela.jpg";

    const discoverBible = "https://static.wixstatic.com/media/d166cc_fc0265a7548b4bc9b50511322f17870d~mv2.png/v1/fill/w_124,h_124,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3000PX%20Logos_Mesa%20de%20trabajo%201.png";

    const imagenFooter = "https://static.wixstatic.com/media/d166cc_89e082e6997946c1924000b082e3d4ad~mv2.jpg/v1/fill/w_980,h_245,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/d166cc_89e082e6997946c1924000b082e3d4ad~mv2.jpg";

    return (
        <div className={styles["aboutUs__container"]}>
            <div className={styles["aboutUs__video--container"]}>
                <video controls className={styles["aboutUs__video"]}>
                    <source src="https://video.wixstatic.com/video/d166cc_bf68bc0718e546a6b23f233fb55617fe/1080p/mp4/file.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className={styles["aboutUs__ourObjetive--container"]}>
                <div className={styles["aboutUs__ourObjetive--title"]}>
                    <p className={styles["aboutUs__ourObjetive--textOur"]}>Nuestro</p>
                    <p className={styles["aboutUs__ourObjetive--textObjective"]}>objetivo</p>
                </div>
                <div className={styles["aboutUs__ourObjetive--paragraph"]}>
                    <p className={styles["aboutUs__ourObjetive--text1"]}>
                        El <b>objetivo</b> es mostrarte lo que ha cambiado nuestras vidas: estudiar la Biblia palabra por palabra, de tapa a tapa, desde el idioma original, recorriendo la historia para entender cómo se ha llegado hasta aquí, qué tradiciones adoptamos y de dónde. <b>¿Te preguntaste alguna vez por qué crees en lo que crees?</b> Bueno tomate un minuto y piénsalo.
                    </p>
                </div>
            </div>
            <div className={styles["aboutUs__ourObjetiveVerse--container"]}>
                <div className={styles["aboutUs__ourObjetiveBible--background"]}></div>
                <span className={styles["aboutUs__ourObjetive--quote"]}>&quot;</span>
                <p className={styles["aboutUs__ourObjetive--verse"]}>
                    CUANDO USTEDES ME BUSQUEN, USTEDES ME ENCONTRARÁN CON TAL DE QUE ME <b>BUSQUEN DE TODO CORAZÓN.</b>
                </p>
            </div>
            <div className={styles["aboutUs__ourObjetive--paragraph2"]}>
                <p className={styles["aboutUs__ourObjetiveParagraph2--text1"]}>
                    Te contaremos qué programas, libros y diccionarios podrías usar para empezar a estudiar las únicas palabras que pueden transformar nuestras vidas, la voz que nos permitirá encontrar un propósito para despertar cada mañana. Pero si no tienes ninguna pregunta y llegaste aquí de casualidad ¡no hay problema! También te servirá aprender un poco de historia, ciertas palabras en un nuevo idioma y hasta “tips” para vivir. Talvez te des cuenta que el libro más antiguo habla de ti o talvéz no ¿quién sabe? De todas formas no pierdes nada.
                </p>
                <p className={styles["aboutUs__ourObjetiveParagraph2--text2"]}>
                    En fin, lo haremos cortito: somos un grupo de chicos que descubrimos la profundidad y verdad del libro más vendido y menos comprendido del mundo, sin institutos bíblicos, grandes congregaciones o sistemas religiosos. Sin merecerlo nos hallamos dentro del plan de nuestro Dios, el Creador de todo lo que existe. <b>Solo queremos exponer la voz del verdadero y único Pastor porque sabemos que Sus ovejas oirán Su voz.</b>
                </p>
            </div>
            <div className={styles["aboutUs__ourObjetive--photos"]}>
                <div>
                    <img className={styles["aboutUs__ourObjeticePhotos--lincolns"]} src={imagenLincolns} alt="lincolns' photo" />
                    <p className={styles["aboutUs__ourObjetice--textPhoto"]}><b>Lincolns</b> y <b>Mariuxi</b></p>
                    <p className={styles["aboutUs__ourObjetice--textPhoto"]}>Mendoza</p>
                </div>
                <div>
                    <img className={styles["aboutUs__ourObjeticePhotos--abigail"]} src={imagenAbigailMichell} alt="abigail's photo" />
                    <p className={styles["aboutUs__ourObjetice--textPhoto"]}><b>Abigail</b> Michelle</p>
                </div>
                <div>
                    <img className={styles["aboutUs__ourObjeticePhotos--danielaLopez"]} src={imagenDanielaLopez} alt="daniela's photo" />
                    <p className={styles["aboutUs__ourObjetice--textPhoto"]}><b>Daniela</b> López</p>
                </div>
            </div>
            <div className={styles["aboutUs__ourObjetive--paragraph3"]}>
                <div className={styles["aboutUs__ourObjetiveParagraph3--container"]}>
                    <div className={styles["aboutUs__ourObjetiveParagraph3--text1"]}>
                        <p className={styles["aboutUs__ourObjetive--textMinistries"]}>Minesterios</p>
                        <p className={styles["aboutUs__ourObjetive--textAssociates"]}>asociados</p>
                    </div>
                    <p className={styles["aboutUs__ourObjetiveParagraph3--text2"]}>
                        ¡Más de <b>3000 horas de comentarios</b> y <b>explicaciones de toda la Biblia! </b>
                        <span>
                            estudios panorámicos y resúmenes de cada libro, estudios verso por verso de todos los capítulos de la Biblia en formato de audio mp3, con sus respectivas transcripciones en pdf, además de estudios en video en el lugar de los hechos.
                            <br />
                            <br />
                            Si tienes un llamado a la enseñanza de la Biblia, o simplemente estás hambriento por aprender, en esta página encontrarás recursos ilimitados para saciar tu hambre.
                        </span>
                        <div>
                            <img src={discoverBible} alt="Image of bible background" />
                        </div>
                    </p>
                </div>
            </div>
            <div className={styles["aboutUs__ourObjetive--imgFooterContainer"]}>
                <img src={imagenFooter} alt="Image people worshiping" />
            </div>
        </div>
    )
}