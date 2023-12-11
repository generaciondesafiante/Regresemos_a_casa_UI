// icon:star-of-david | Fontawesome https://fontawesome.com/ | Fontawesome
import * as React from "react";
import styles from "./DavidStarIcon.module.css";

export const DavidStarIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={styles["icon-davidStar"]}
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M404.2 309.5L383.1 344h42.3l-21.1-34.5zM371.4 256l-54-88H194.6l-54 88 54 88h122.8l54-88zm65.7 0l53.4 87c3.6 5.9 5.5 12.7 5.5 19.6 0 20.7-16.8 37.4-37.4 37.4H348.7l-56.2 91.5c-7.7 12.8-21.6 20.5-36.5 20.5s-28.8-7.7-36.6-20.5L163.3 400H53.4C32.8 400 16 383.2 16 362.6c0-6.9 1.9-13.7 5.5-19.6l53.4-87-53.4-87c-3.6-5.9-5.5-12.7-5.5-19.6 0-20.6 16.8-37.4 37.4-37.4h109.9l56.2-91.5C227.2 7.7 241.1 0 256 0s28.8 7.7 36.6 20.5l56.1 91.5h109.9c20.7 0 37.4 16.8 37.4 37.4 0 6.9-1.9 13.7-5.5 19.6l-53.4 87zm-54-88l21.1 34.5 21.2-34.5h-42.3zM283 112l-27-44-27 44h54zm-154.1 56H86.6l21.1 34.5 21.2-34.5zm-21.1 141.5L86.6 344h42.3l-21.1-34.5zM229 400l27 44 27-44h-54z" />
    </svg>
  );
};
