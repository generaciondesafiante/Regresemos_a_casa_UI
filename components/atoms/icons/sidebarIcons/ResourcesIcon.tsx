import * as React from "react";
import styles from "./sidebarIcons.module.css";

export const ResourcesIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={styles["icons-sidebar"]}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M20 5h-8.586L9.707 3.293A.997.997 0 009 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z" />
    </svg>
  );
};
