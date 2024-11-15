"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { toast, ToastContainer } from "react-toastify";
import { hideNotification } from "../../../store/slices/notificationSlice ";
import "react-toastify/dist/ReactToastify.css";
import styles from "./NotifyToast.module.css";

const ToastNotification = () => {
  const dispatch = useAppDispatch();
  const { message, visible } = useAppSelector(
    (state) => state.notificationToast
  );

  useEffect(() => {
    if (visible && message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible, message, dispatch]);

  return (
    <div className={styles["toast"]}>
      <ToastContainer />
    </div>
  );
};

export default ToastNotification;
