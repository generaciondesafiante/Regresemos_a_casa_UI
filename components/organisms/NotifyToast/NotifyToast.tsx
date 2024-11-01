"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { hideNotification } from "../../../store/slices/notificationSlice ";
import styles from "./NotifyToast.module.css";
import { IconCheckCircle } from "../../atoms/icons/CheckCirculeIcon/CheckCirculeIcon";

const ToastNotification = () => {
  const dispatch = useAppDispatch();
  const { message, visible } = useAppSelector(
    (state) => state.notificationToast
  );

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={styles.toast}
    >
      <span className={styles['toast__message']}>{message}</span>
      <IconCheckCircle />
    </motion.div>
  );
};

export default ToastNotification;
