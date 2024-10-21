"use client";
import Link from "next/link";
import { useState } from "react";
import { menuData } from "../MenuData";
import { UpArrow } from "../../../atoms/icons/topMenu/UpArrow";
import { DownArrow } from "../../../atoms/icons/topMenu/DownArrow";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import "./HamburgerMenu.css";

interface SubMenuVisibility {
  [key: number]: boolean;
}

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const subMenuVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: { opacity: 1, height: "auto" },
};

export const HamburgerMenu = () => {
  const pathName = usePathname();

  const [burger_class, setBurger_class] = useState("burger-bar unclicked");
  const [menu_class, setMenu_class] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [subMenuVisibility, setSubMenuVisibility] = useState<SubMenuVisibility>(
    {}
  );

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurger_class("burger-bar clicked");
      setMenu_class("menu visible");
    } else {
      setBurger_class("burger-bar unclicked");
      setMenu_class("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const toggleSubMenu = (index: number) => {
    setSubMenuVisibility({
      ...subMenuVisibility,
      [index]: !subMenuVisibility[index],
    });
  };

  const handleMainMenuItemClick = (data: any, index: number) => {
    if (data.subMenu) {
      toggleSubMenu(index);
    } else if (data.href) {
      updateMenu();
    }
  };

  const isMainMenuItemSelected = (data: any) => {
    if (pathName === data.href) {
      return true;
    }
    if (data.subMenu) {
      return data.subMenu.some((subItem: any) => subItem.href === pathName);
    }
    return false;
  };

  return (
    <div className="containerMenu">
      {isMenuClicked && <div className="overlay" onClick={updateMenu} />}
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>
      <motion.div
        className={menu_class}
        initial="hidden"
        animate={isMenuClicked ? "visible" : "hidden"}
        exit="exit"
        variants={menuVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="container-menu-items">
          {menuData.map((data, index) => (
            <div key={index}>
              <div onClick={() => handleMainMenuItemClick(data, index)}>
                {data.href ? (
                  <Link
                    href={data.href}
                    passHref
                    className={`items-menu ${
                      isMainMenuItemSelected(data) ? "selected" : ""
                    }`}
                  >
                    {data.title}
                    {data.subMenu && (
                      <span className="arrow">
                        {subMenuVisibility[index] ? <UpArrow /> : <DownArrow />}
                      </span>
                    )}
                  </Link>
                ) : (
                  <div
                    className={`items-menu ${
                      isMainMenuItemSelected(data) ? "selected" : ""
                    }`}
                  >
                    {data.title}
                    {data.subMenu && (
                      <span className="arrow">
                        {subMenuVisibility[index] ? <UpArrow /> : <DownArrow />}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {data.subMenu && (
                <motion.ul
                  className={"subMenu-container"}
                  initial="hidden"
                  animate={subMenuVisibility[index] ? "visible" : "hidden"}
                  variants={subMenuVariants}
                  transition={{ duration: 0.3 }}
                >
                  {data.subMenu.map((item, subIndex) => (
                    <motion.li
                      key={subIndex}
                      className={`subMenu-items ${
                        pathName === item.href ? "selected" : ""
                      }`}
                      variants={itemVariants}
                      initial="hidden"
                      animate={subMenuVisibility[index] ? "visible" : "hidden"}
                      transition={{ duration: 0.3, delay: subIndex * 0.1 }}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`subMenu-items ${
                            pathName === item.href ? "selected" : ""
                          }`}
                          onClick={() => updateMenu()}
                        >
                          {item.title}
                        </Link>
                      ) : null}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
