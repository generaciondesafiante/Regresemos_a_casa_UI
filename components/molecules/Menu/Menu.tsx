"use client";
import Link from "next/link";
import styles from "./Menu.module.css";
import { HamburgerMenu } from "./HamburgerMenu/HamburgerMenu";
import { menuData } from "./MenuData";
import { useState } from "react";
import { UpArrow } from "../../atoms/icons/topMenu/UpArrow";
import { DownArrow } from "../../atoms/icons/topMenu/DownArrow";
import { usePathname } from "next/navigation";

interface SubMenuVisibility {
  [key: number]: boolean;
}

export const Menu: React.FC = () => {
  const pathName = usePathname();

  const [subMenuVisibility, setSubMenuVisibility] = useState<SubMenuVisibility>(
    {}
  );

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
    setSubMenuVisibility({
      ...subMenuVisibility,
      [index]: true,
    });
  };

  const handleMenuMouseLeave = (index: number) => {
    if (!subMenuVisibility[-1]) {
      setSubMenuVisibility({
        ...subMenuVisibility,
        [index]: false,
      });
    }
  };

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <img
          className={styles["header-logo"]}
          src="https://i.imgur.com/B0R1LHJ.png"
          alt="Logo generación desafiante"
        />
      </Link>
      <section className={styles["header-container_btn"]} onMouseLeave={() => handleMenuMouseLeave(-1)}>
        {menuData.map((data, index) => (
          <div key={index} onMouseEnter={() => handleMenuMouseEnter(index)} onMouseLeave={() => handleMenuMouseLeave(index)}>
            <Link
              href={data.href}
              key={data.href}
              onClick={() => handleMenuClick(index)}
              className={`${styles["item-header"]} ${
                pathName === data.href ? styles["selected"] : ""
              }`}
            >
              <p>{data.title}</p>
              {data.subMenu && (
                <span className={styles["arrow"]}>
                  {subMenuVisibility[index] ? <UpArrow /> : <DownArrow />}
                </span>
              )}
            </Link>

            {data.subMenu && subMenuVisibility[index] && (
              <>
                <div
                  className={styles["subMenu-overlay"]}
                  onClick={() => toggleSubMenu(index)}
                />
                <ul className={styles["subMenu-container"]} onMouseEnter={() => handleMenuMouseEnter(index)} onMouseLeave={() => handleMenuMouseLeave(index)}>
                  {data.subMenu.map((item, subIndex) => (
                    <Link href={item.href} key={subIndex} className={styles["subMenu-items"]}>
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

