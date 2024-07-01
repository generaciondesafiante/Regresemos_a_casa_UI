import Link from "next/link";
import styles from "./VerseByVerse.module.css";

export const VerseToVerse = () => {
  const dataVideo = [
    {
      name: "Romanos",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2FRomanos.webp?alt=media&token=a37ba147-1098-4b9c-83fb-284ba2b2cda4",
      href: "https://youtube.com/playlist?list=PLX-KKyt726LOHixfRAACHnrj92Oc52-KT&si=taxUzi2aTfppVVqN",
    },
    {
      name: "Gálatas",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fgalatas.webp?alt=media&token=bac19660-dfbc-4b8e-8076-09009b08db5b",
      href: "https://youtube.com/playlist?list=PLX-KKyt726LNrsNZIRLe2Bio9YmIhCE-x&si=8rFSbi1JTxuobklx",
    },
    {
      name: "Efesios",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fefesios.webp?alt=media&token=53afb5e4-8e89-4577-a7aa-2eec36f04ab3",
      href: "https://youtube.com/playlist?list=PLX-KKyt726LPejLyG-QUS0xlBtUXdA1_C&si=6hP6WgQh6mZVpDdt",
    },
    {
      name: "Filipenses",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Ffilipenses.webp?alt=media&token=5cbdcc70-dbc6-4abf-bcca-da39fcf4f48d",
      href: "https://www.youtube.com/watch?v=Rf3H2HmRRCY&t=1s",
    },
    {
      name: "Colosenses",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fcolosenses.webp?alt=media&token=a0606352-3f54-4371-93ca-c55d15d3306f",
      href: "https://www.youtube.com/watch?v=Jmt-nxK0VBI",
    },
    {
      name: "Tesalonicenses",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Ftesalonicenses.webp?alt=media&token=4b3e9222-c21f-45bb-b991-f30402c9e1cd",
      href: "https://youtube.com/playlist?list=PLX-KKyt726LMBAFR_aQS5I0PsRbuSBJk1&si=3ZH8BfkG29RptbQe",
    },
    {
      name: "Tito",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Ftito.webp?alt=media&token=ec76627a-0e57-4619-bfb7-d8247861d6d1",
      href: "https://www.youtube.com/watch?v=1CUQokINDLM",
    },
    {
      name: "Filemón",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Ffilemon.webp?alt=media&token=40f0ddff-5967-4f2a-bf89-620e02c42df5",
      href: "https://youtu.be/spw9_OUVycs?si=4LE4CJ39sejAU8kL",
    },
    {
      name: "Santiago",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fsantiago.webp?alt=media&token=da3ddc03-4b63-4f9d-8b19-eccc38f845ef",
      href: "https://www.youtube.com/watch?v=l7nBXnoJNhI",
    },
    {
      name: "Carta de Pedro",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fcarta%20de%20pedro.webp?alt=media&token=93027baf-ca86-4d8e-abd3-4a85f1d109be",
      href: "https://www.youtube.com/watch?v=xVvjDVsNtrQ",
    },
    {
      name: "Carta de Juan",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fcartas%20de%20juan.webp?alt=media&token=9021600c-de2f-4989-bae1-8ad5517307fc",
      href: "https://youtube.com/playlist?list=PLX-KKyt726LPKjNu1aZI94xMG0-0YTLkO&si=z_I3g5ud6ta7qMLH",
    },
    {
      name: "Carta de Judas",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fjudas.webp?alt=media&token=210506f6-8810-4469-9380-f1acdac5de5f",
      href: "https://www.youtube.com/watch?v=pN6qOLpLg4s",
    },
    {
      name: "Apocalipsis",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fapocalipsis.webp?alt=media&token=49643fb3-9d5f-482b-8152-e838a902312e",
      href: "https://youtube.com/playlist?list=PLX-KKyt726LP1t6VePesyukcaQQ-BHaJg&si=HHwbGMknf8EKa8Dl",
    },
    {
      name: "Deuteronomio",
      image:
        "https://firebasestorage.googleapis.com/v0/b/verso-por-verso.appspot.com/o/verso%20por%20verso%2Fdeuteronomio.webp?alt=media&token=4e713b40-e106-4848-8ca1-cf9b6fe55264",
      href: "https://youtube.com/playlist?list=PLX-KKyt726LPrURnoMRWSYvldlQ3b8Kf7&si=4QUr9HiralaX9cQ-",
    },
  ];

  return (
    <section>
      <div className={styles["verseToVerse__background--banner"]}>
        <div className={styles["verseToVerse__container--banner"]}>
          <div>
            <p className={styles["verseToVerse__doubleQuotation--banner"]}>
              &ldquo;
            </p>
          </div>
          <div className={styles["verseToVerse__content--banner"]}>
            <h2 className={styles["verseToVerse__title--banner"]}>
              Leían del libro de la ley de Dios y explicaban con claridad el
              significado de lo que se leía.
            </h2>
            <div className={styles["verseToVerse__content--info-banner"]}>
              <p className={styles["verseToVerse__paragraph--banner"]}>
                Nehemías 8:8
              </p>
              <div className={styles["verseToVerse__line--banner"]}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["verseToVerse__container--studiesVerse"]}>
        <div>
          <h2 className={styles["verseToVerse__title--studiesVerse"]}>
            Estudios <br />
            verso por verso
          </h2>
          <div className={styles["verseToVerse__line--studiesVerse"]}></div>
        </div>
        <div>
          <p className={styles["verseToVerse__paragraph--studiesVerse"]}>
            Estudiamos las Escrituras verso a verso, en el contexto en el que
            fueron escritas. Nuestro deseo es comprender el corazón del Padre y
            cumplir con lo enseñado en Nehemías 8:{" "}
            <span>
              &quot;Leían del libro de la ley de Dios y explicaban con claridad
              el significado de lo que se leía,
            </span>
            <span> así ayudaban al pueblo a comprender cada pasaje&quot;.</span>
          </p>
        </div>
      </div>
      <div className={styles["verseToVerse__background--videosStudiesVerse"]}>
        <div className={styles["verseToVerse__content--videosStudiesVerse"]}>
          {dataVideo.map((video, index) => (
            <Link href={video.href} key={index} target="_blank">
              <img
                src={video.image}
                alt={video.name}
                className={styles["verseToVerse__image--videosStudiesVerse"]}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
