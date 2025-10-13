"use client";
import React from "react";
import styles from "./styles.module.css";
import Text from "@/shared/components/Text";
import Icon from "@/shared/components/Icons";
import { useRouter } from "next/navigation";

const LayoutTablesAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <main className={styles["container__resource"]}>
      <section className={styles["content__resource"]}>
        <div
          className={styles["backRoutes"]}
          onClick={() => {
            router.back();
          }}
        >
          <Icon name="MdOutlineKeyboardBackspace" color="white" />
          <Text variant="h4" color="white">
            Volver
          </Text>
        </div>

        {children}
      </section>
    </main>
  );
};

export default LayoutTablesAdmin;
