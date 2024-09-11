"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ArrowBack.module.css";
import { ArrowLeftIcon } from "../icons/arrowsIcons/ArrowLeftIcon";

interface Props {
  linkBack: string;
  text: string;
  colorText?: string;
  colorHover?: string;
}

const predefinedColors = {
  white: "var(--white)",
  lightGray: "var(--lightGray)",
  darkBlue: "var(--darkBlue)",
  darkGreen: "var(--darkGreen)",
  greenDesafiante: "var(--greenDesafiante)",
};

export const ArrowBack = ({ linkBack, text, colorText, colorHover }: Props) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const finalColorText =
    colorText && predefinedColors[colorText as keyof typeof predefinedColors]
      ? predefinedColors[colorText as keyof typeof predefinedColors]
      : predefinedColors.darkGreen;

  const finalColorHover =
    colorHover && predefinedColors[colorHover as keyof typeof predefinedColors]
      ? predefinedColors[colorHover as keyof typeof predefinedColors]
      : predefinedColors.greenDesafiante;

  return (
    <div
      className={`${styles["container__back"]} ${
        isHovered ? styles["container__back-hover"] : ""
      }`}
      style={{
        color: isHovered ? finalColorHover : finalColorText,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(linkBack)}
    >
      <ArrowLeftIcon />
      <p>{text}</p>
    </div>
  );
};
