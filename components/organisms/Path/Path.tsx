import styles from "./Path.module.css";
export const Path = async () => {
  const responseValidate = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/course/coursedata`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(responseValidate);
  return (
    <div className={styles["path-container"]}>
      <div className={styles["path-content"]}>
        <div className={styles["path-border"]}>
          <img
            className={`${styles["path-img_flag"]} ${styles["flag-start"]}`}
            src="https://i.imgur.com/pIOGRDs.png"
            alt="Bandera del inicio"
          />

          <img
            className={`${styles["path-img_flag"]} ${styles["flag-end"]}`}
            src="https://i.imgur.com/8cfdvwv.png"
            alt="Bandera de la meta"
          />

          <button
            // onClick={() => handleUrlId(course)}
            className={styles["path-learningPath"]}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="3rem"
              width="3rem"
            >
              <path d="M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V7zm9.002 13H13v-2.278c.595-.347 1-.985 1-1.722 0-1.103-.897-2-2-2s-2 .897-2 2c0 .736.405 1.375 1 1.722V20H6v-9h12l.002 9z" />
            </svg>
          </button>
          <p className={styles["path-CourseTitle"]}>name course</p>
        </div>
      </div>
    </div>
  );
};
