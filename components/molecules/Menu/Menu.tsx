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
import { motion, AnimatePresence } from "framer-motion";
interface SubMenuVisibility {
  [key: number]: boolean;
}

export interface MenuItem {
  href: string;
  title: string;
  subMenu?: MenuItem[];
}

const fadeSlide = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
};

const rotateArrow = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
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
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (index: number) => {
    setSubMenuVisibility({
      ...subMenuVisibility,
      [index]: !subMenuVisibility[index],
    });
  };

  const handleMenuClick = (menuHref: string, subMenuHref?: string) => {
    setSelectedMenu(menuHref);
    if (subMenuHref) {
      setSelectedSubMenu(subMenuHref);
    } else {
      setSelectedSubMenu(null);
    }
  };

  const handleMenuMouseEnter = (index: number) => {
    setSubMenuVisibility((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleMenuMouseLeave = (index: number) => {
    setSubMenuVisibility((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const filteredMenuData = menuData.filter((data: MenuItem) => {
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
      <section className={styles["menu-header_containerBtn"]}>
        {filteredMenuData.map((data, index) => (
          <div
            key={index}
            className={styles["menu-header_itemWrapper"]}
            onMouseEnter={() => handleMenuMouseEnter(index)}
            onMouseLeave={() => handleMenuMouseLeave(index)}
          >
            <Link
              href={data.href}
              key={data.href}
              onClick={() => handleMenuClick(data.href)}
              className={`${styles["menu-header_item"]} ${
                data.subMenu &&
                data.subMenu.some((subItem) => subItem.href === selectedSubMenu)
                  ? styles["selected"]
                  : !data.subMenu &&
                    normalizedPathName === normalizePathName(data.href)
                  ? styles["selected"]
                  : ""
              }`}
            >
              <p>{data.title}</p>
              {data.subMenu && (
                <motion.span
                  className={styles["menu-header_arrow"]}
                  initial="closed"
                  animate={subMenuVisibility[index] ? "open" : "closed"}
                  variants={rotateArrow}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {subMenuVisibility[index] ? <UpArrow /> : <DownArrow />}
                </motion.span>
              )}
            </Link>
            {data.subMenu && (
              <AnimatePresence>
                {subMenuVisibility[index] && (
                  <motion.ul
                    initial="hidden"
                    animate={subMenuVisibility[index] ? "visible" : "hidden"}
                    exit="exit"
                    variants={fadeSlide}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={styles["menu-header_subMenuContainer"]}
                  >
                    {data.subMenu.map((item, subIndex) => (
                      <Link
                        href={item.href}
                        key={subIndex}
                        onClick={() => handleMenuClick(data.href, item.href)}
                        className={`${styles["menu-header_subMenuItems"]} ${
                          selectedSubMenu === item.href
                            ? styles["selected"]
                            : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </section>
      <HamburgerMenu />
    </header>
  );
};
