import { FC, ReactNode } from "react";
import { CloseModalIcon } from "../../atoms/icons/closeModalIcon/CloseModalIcon";
import styles from "./Modal.module.css";

interface Props {
  children?: ReactNode;
  openModalProfile?: boolean;
  closeModalProfile?: () => void;
  title: string;
}

interface Props {
  children?: ReactNode;
  openModalProfile?: boolean;
  onSaveChangesAndCloseModal?: () => void;
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
            <button onClick={closeModalProfile}>
              <CloseModalIcon
                className={styles["modalEditProfile-iconClose"]}
              />
            </button>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
