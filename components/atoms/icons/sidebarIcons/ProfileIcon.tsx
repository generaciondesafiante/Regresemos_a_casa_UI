import * as React from "react";
import styles from "./sidebarIcons.module.css";

export const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={styles["icons-sidebar"]}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M9 11.75A1.25 1.25 0 007.75 13 1.25 1.25 0 009 14.25 1.25 1.25 0 0010.25 13 1.25 1.25 0 009 11.75m6 0A1.25 1.25 0 0013.75 13 1.25 1.25 0 0015 14.25 1.25 1.25 0 0016.25 13 1.25 1.25 0 0015 11.75M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m0 18c-4.41 0-8-3.59-8-8 0-.29 0-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37a9.974 9.974 0 0010.41 3.97c.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
    </svg>
  );
};
