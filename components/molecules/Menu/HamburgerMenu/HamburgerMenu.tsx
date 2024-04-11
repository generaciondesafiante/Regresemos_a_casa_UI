"use client";
import { useState } from "react";
import { menuData } from "../MenuData";
import "./HamburgerMenu.css";
import { UpArrow } from "../../../atoms/icons/topMenu/UpArrow";
import { DownArrow } from "../../../atoms/icons/topMenu/DownArrow";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SubMenuVisibility {
  [key: number]: boolean;
}

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
      subMenuVisibility;
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
      console.log("Redireccionar a:", data.href);
    }
  };

  return (
    <div className="containerMenu">
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>
      <div className={menu_class}>
        <div className="container-menu-items">
          {menuData.map((data, index) => (
            <div key={index}>
              <div onClick={() => handleMainMenuItemClick(data, index)}>
                {data.href ? (
                  <Link
                    href={data.href}
                    passHref
                    className={`items-menu ${
                      pathName === data.href ? "selected" : ""
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
                      pathName === data.href ? "selected" : ""
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
              {data.subMenu && subMenuVisibility[index] && (
                <ul className={"subMenu-container"}>
                  {data.subMenu.map((item, subIndex) => (
                    <li
                      key={subIndex}
                      className={`subMenu-items ${
                        pathName === item.href ? "selected" : ""
                      }`}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`subMenu-items ${
                            pathName === item.href ? "selected" : ""
                          }`}
                        >
                          {item.title}
                        </Link>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
