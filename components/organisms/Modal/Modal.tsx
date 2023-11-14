import { FC, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Modal.module.css";

interface Props {
  children?: ReactNode;
  openModalProfile?: boolean;
  closeModalProfile?: () => void;
  title: string;
}

export const ModalEditPhotoProfile: FC<Props> = ({
  children,
  openModalProfile,
  closeModalProfile,
  title = "Add Profile Photo",
}) => {
  return (
    <>
      {openModalProfile && (
        <div className={styles["modalEditProfile-overlay"]}>
          <div className={styles["modalEditProfile-container"]}>
            <h3 className={styles["modalEditProfile-title"]}>{title}</h3>
            <button onClick={() => closeModalProfile && closeModalProfile()}>
              <CloseIcon className={styles["modalEditProfile-iconClose"]} />
            </button>
            <div className={styles["modalEditProfile-content"]}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
