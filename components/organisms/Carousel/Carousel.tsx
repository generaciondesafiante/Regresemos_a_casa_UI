"use client";
import { useEffect, useRef } from "react";
import { Slide1, Slide2, Slide3 } from "../../molecules";
import styles from "./Carousel.module.css";
import { ArrowRightIcon } from "../../atoms/icons/arrowsIcons/ArrowRightIcon";
import { ArrowLeftIcon } from "../../atoms/icons/arrowsIcons/ArrowLeftIcon";

export const Carousel: React.FC = () => {
  const slideshow = useRef<HTMLDivElement>(null);
  const slideshowInterval = useRef<NodeJS.Timeout | null>(null);

  const following = () => {
    if (slideshow.current && slideshow.current.children.length > 0) {
      const firstElement = slideshow.current.children[0] as HTMLElement;
      slideshow.current.style.transition = `500ms ease-out all`;

      if (firstElement instanceof HTMLElement) {
        const sizeSlide = firstElement.offsetWidth;

        slideshow.current.style.transform = `translateX(-${sizeSlide / 16}rem)`;
      }

      const transition = () => {
        slideshow.current!.style.transition = "none";
        slideshow.current!.style.transform = `translateX(0)`;
        slideshow.current!.appendChild(firstElement);
        slideshow.current?.removeEventListener("transitionend", transition);
      };

      slideshow.current.addEventListener("transitionend", transition);
    }
  };

  const former = () => {
    if (slideshow.current && slideshow.current.children.length > 0) {
      const index = slideshow.current.children.length - 1;
      const lastElement = slideshow.current.children[index] as HTMLElement;

      slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);

      slideshow.current.style.transition = "none";

      if (lastElement instanceof HTMLElement) {
        const sizeSlide = lastElement.offsetWidth;
        slideshow.current.style.transform = `translateX(-${sizeSlide}rem)`;

        setTimeout(() => {
          slideshow.current!.style.transition = "500ms ease-out all";
          slideshow.current!.style.transition = "500ms ease-out all";
          slideshow.current!.style.transform = `translateX(0)`;
        }, 1);
      }
    }
  };

  useEffect(() => {
    slideshowInterval.current = setInterval(() => {
      following();
    }, 8000);

    return () => {
      if (slideshowInterval.current) {
        clearInterval(slideshowInterval.current);
      }
    };
  }, []);

  return (
    <div className={styles["carousel-container"]}>
      <div className={styles["carousel-content_view"]} ref={slideshow}>
        <div className={styles["carousel-view"]}>
          <Slide1 />
        </div>
        <div className={styles["carousel-view"]}>
          <Slide2 />
        </div>
        <div className={styles["carousel-view"]}>
          <Slide3 />
        </div>
      </div>
      <button
        className={`${styles["carousel-btn"]} ${styles["carousel-btn_right"]}`}
        onClick={former}
      >
        <ArrowLeftIcon/>
      </button>
      <button
        className={`${styles["carousel-btn"]} ${styles["carousel-btn_left"]}`}
        onClick={following}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};
