"use client";
import styles from "./Favorites.module.css";
import { useEffect, useState, useRef } from "react";
import { RightArrowBtnFavorites } from "../../atoms/icons/arrowsIcons/arrowBtnFavorites/RightArrowBtnFavorites";
import { LeftArrowBtnFavorites } from "../../atoms/icons/arrowsIcons/arrowBtnFavorites/LeftArrowBtnFavorites";

export const Favorites = () => {
  const [selectedType, setSelectedType] = useState("Todos");
  const [isActiveButtonAll, setIsActiveButtonAll] = useState(true);
  const [isActiveButtonLibros, setIsActiveButtonLibros] = useState(false);
  const [isActiveButtonVideos, setIsActiveButtonVideos] = useState(false);
  const [isActiveButtonPdf, setIsActiveButtonPdf] = useState(false);
  const [isActiveButtonDocumentales, setIsActiveButtonDocumentales] =
    useState(false);

  useEffect(() => {
    handleButtonClick("all");
  }, []);

  const handleButtonClick = (type: string) => {
    setSelectedType(type);
    setIsActiveButtonAll(type === "all");
    setIsActiveButtonLibros(type === "Libro");
    setIsActiveButtonVideos(type === "Video");
    setIsActiveButtonPdf(type === "PDF");
    setIsActiveButtonDocumentales(type === "Documental");
  };

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsScrollable(container.scrollWidth > container.clientWidth);
      if (direction === "left") {
        container.scrollLeft -= 100;
      } else if (direction === "right") {
        container.scrollLeft += 100;
      }
      setIsLeftButtonVisible(container.scrollLeft > 0);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsScrollable(container.scrollWidth > container.clientWidth);
    }
  }, [scrollContainerRef]);

  const favorites = [
    {
      id: 1,
      typeFavorite: "Libro1",
    },
    {
      id: 2,
      typeFavorite: "PDF1",
    },
    {
      id: 3,
      typeFavorite: "Video1",
    },
    {
      id: 4,
      typeFavorite: "Documental1",
    },
    {
      id: 5,
      typeFavorite: "Libro2",
    },
    {
      id: 6,
      typeFavorite: "PDF2",
    },
    {
      id: 7,
      typeFavorite: "Video2",
    },
    {
      id: 8,
      typeFavorite: "Documental2",
    },
    {
      id: 9,
      typeFavorite: "Libro3",
    },
    {
      id: 10,
      typeFavorite: "PDF3",
    },
    {
      id: 11,
      typeFavorite: "Video3",
    },
    {
      id: 12,
      typeFavorite: "Documental3",
    },
    {
      id: 13,
      typeFavorite: "Libro4",
    },
    {
      id: 14,
      typeFavorite: "PDF4",
    },
    {
      id: 15,
      typeFavorite: "Video4",
    },
    {
      id: 16,
      typeFavorite: "Documental4",
    },
    {
      id: 17,
      typeFavorite: "Libro5",
    },
    {
      id: 18,
      typeFavorite: "PDF5",
    },
    {
      id: 19,
      typeFavorite: "Video5",
    },
    {
      id: 20,
      typeFavorite: "Documental5",
    },
  ];

  const filteredFavorites =
    selectedType === "all"
      ? favorites
      : favorites.filter((favorite) =>
          favorite.typeFavorite.includes(selectedType)
        );

  return (
    <div className={styles["favorites-container"]}>
      <h1 className={styles["favorites-title"]}>MIS FAVORITOS</h1>
      <main>
        <section
          className={styles["favorites-section_buttons"]}
          ref={scrollContainerRef}
        >
          <button
            className={`${styles["favorites-arrow_btn"]} ${
              styles["favorites-btn_left"]
            } ${isLeftButtonVisible ? "" : styles.hidden}`}
            onClick={() => handleScroll("left")}
          >
            <LeftArrowBtnFavorites className={styles["favorites-iconArrow"]} />
          </button>
          <button
            className={`${styles["favorites-button"]} ${
              isActiveButtonAll ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("all")}
          >
            Todos
          </button>
          <button
            className={`${styles["favorites-button"]} ${
              isActiveButtonLibros ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Libro")}
          >
            Libros
          </button>
          <button
            className={`${styles["favorites-button"]} ${
              isActiveButtonVideos ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Video")}
          >
            Videos
          </button>
          <button
            className={`${styles["favorites-button"]} ${
              isActiveButtonPdf ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("PDF")}
          >
            PDF
          </button>
          <button
            className={`${styles["favorites-button"]} ${
              isActiveButtonDocumentales ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Documental")}
          >
            Documentales
          </button>
          <button className={styles["favorites-button"]}>Prueba1</button>
          <button className={styles["favorites-button"]}>Prueba2</button>
          <button className={styles["favorites-button"]}>Prueba3</button>
          <button className={styles["favorites-button"]}>Prueba4</button>
          <button className={styles["favorites-button"]}>Prueba5</button>
          <button className={styles["favorites-button"]}>Prueba6</button>
          <button className={styles["favorites-button"]}>Prueba7</button>
          <button className={styles["favorites-button"]}>Prueba8</button>
          <button className={styles["favorites-button"]}>Prueba9</button>
          {isScrollable && (
            <button
              className={`${styles["favorites-arrow_btn"]} ${styles["favorites-btn_right"]}`}
              onClick={() => handleScroll("right")}
            >
              <RightArrowBtnFavorites
                className={styles["favorites-iconArrow"]}
              />
            </button>
          )}
        </section>
        <section>
          <div className={styles["favorites-container_cards"]}>
            {filteredFavorites.map((favorite) => (
              <div key={favorite.id} className={styles["favorites-cards"]}>
                {favorite.typeFavorite}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
