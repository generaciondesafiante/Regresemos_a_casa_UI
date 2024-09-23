"use client";
import Link from "next/link";
import styles from "./Menu.module.css";
import { HamburgerMenu } from "./HamburgerMenu/HamburgerMenu";
import { menuData } from "./MenuData";
import { useState } from "react";
import { UpArrow } from "../../atoms/icons/topMenu/UpArrow";
import { DownArrow } from "../../atoms/icons/topMenu/DownArrow";
import { usePathname } from "next/navigation";
import { getEnabledRoutes } from "../../../feature/BlockedRoutesPublicsFeatureFlags/getEnabledRoutesPublics";

interface SubMenuVisibility {
  [key: number]: boolean;
}

const normalizePathName = (path: string) => {
  return path
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ /g, "-");
};

export const Menu: React.FC = () => {
  const pathName = usePathname();
  const normalizedPathName = normalizePathName(pathName);
  const [subMenuVisibility, setSubMenuVisibility] = useState<SubMenuVisibility>(
    {}
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setSubMenuVisibility({
      ...subMenuVisibility,
      [index]: !subMenuVisibility[index],
    });
  };

  const handleMenuClick = (index: number) => {
    if (!subMenuVisibility[index]) {
      setSubMenuVisibility({
        ...subMenuVisibility,
        [index]: true,
      });
    }
  };

  const handleMenuMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setSubMenuVisibility((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleMenuMouseLeave = (index: number) => {
    if (!subMenuVisibility[-1]) {
      setSubMenuVisibility({
        ...subMenuVisibility,
        [index]: false,
      });
    }
  };

  const filteredMenuData = menuData.filter((data) => {
    const enabledRoutes = getEnabledRoutes([data.href]);
    return enabledRoutes.length > 0;
  });

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <img
          className={styles["menu-header_logo"]}
          src="https://i.imgur.com/B0R1LHJ.png"
          alt="Logo generación desafiante"
        />
      </Link>
      <section
        className={styles["menu-header_containerBtn"]}
        onMouseLeave={() => handleMenuMouseLeave(-1)}
      >
        {filteredMenuData.map((data, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMenuMouseEnter(index)}
            onMouseLeave={() => handleMenuMouseLeave(index)}
          >
            <Link
              href={data.href}
              key={data.href}
              onClick={() => handleMenuClick(index)}
              className={`${styles["menu-header_item"]} ${
                pathName === data.href ? styles["selected"] : ""
              }`}
            >
              <p>{data.title}</p>
              {data.subMenu && (
                <span className={styles["menu-header_arrow"]}>
                  {subMenuVisibility[index] ? <UpArrow /> : <DownArrow />}
                </span>
              )}
            </Link>

            {data.subMenu && subMenuVisibility[index] && (
              <>
                <div
                  className={styles["menu-header_subMenuOverlay"]}
                  onClick={() => toggleSubMenu(index)}
                />
                <ul
                  className={styles["menu-header_subMenuContainer"]}
                  onMouseEnter={() => handleMenuMouseEnter(index)}
                  onMouseLeave={() => handleMenuMouseLeave(index)}
                >
                  {data.subMenu.map((item, subIndex) => (
                    <Link
                      href={item.href}
                      key={subIndex}
                      className={styles["menu-header_subMenuItems"]}
                    >
                      {item.title}
                    </Link>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </section>

      <HamburgerMenu />
    </header>
  );
};
