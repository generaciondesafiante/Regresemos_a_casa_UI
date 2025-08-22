import React from "react";
import { IconType } from "react-icons";
import { CiWarning } from "react-icons/ci";
import {
  LuPencil,
  LuEye,
  LuBookPlus,
  LuSquarePlay,
  LuImage,
  LuMusic,
  LuFolder,
  LuSearch,
  LuTrash,
  LuCircleCheckBig,
  LuPlus,
  LuX,
} from "react-icons/lu";

import {
  MdDashboard,
  MdDelete,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

// Mapa de íconos permitidos
const iconMap: Record<string, IconType> = {
  LuPencil,
  LuEye,
  LuBookPlus,
  LuSquarePlay,
  LuSearch,
  LuImage,
  LuTrash,
  LuMusic,
  LuFolder,
  LuPlus,
  LuCircleCheckBig,
  LuX,
  MdDashboard,
  MdDelete,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  CiWarning,
};

type IconProps = {
  name: keyof typeof iconMap; // Nombre del ícono a usar
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: () => void;
};

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  onClick,
}: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return <span>❓</span>; // fallback si no existe
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      onClick={onClick}
    />
  );
};

export default Icon;
