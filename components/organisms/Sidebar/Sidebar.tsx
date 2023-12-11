"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardIcon,
  ProfileIcon,
  ResourcesIcon,
} from "../../atoms/icons/sidebarIcons";
import { signOut } from "next-auth/react";
import styles from "./Sidebar.module.css";
import { PathIcon } from "../../atoms/icons/sidebarIcons/PathIcon";
import { FavoriteIcon } from "../../atoms/icons/sidebarIcons/FavoriteIcon";
import { LogoutIcon } from "../../atoms/icons/sidebarIcons/LogoutIcon";

export const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const centeredLinks = ["home", "resources", "favorites", "path"];

  const links = [
    {
      name: "profile",
      href: "/dashboard/profile" || "/dashboard/profile/changepassword",
      icon: <ProfileIcon className={styles["sidebar-icon"]} />,
    },
    {
      name: "home",
      href: "/dashboard",
      icon: (
        <DashboardIcon
          className={`${styles["sidebar-icon"]} ${styles["sidebar-icon_house"]}`}
        />
      ),
    },
    {
      name: "path",
      href: "/dashboard/path",
      icon: <PathIcon className={styles["sidebar-icon"]} />,
    },
    {
      name: "resources",
      href: "/dashboard/resources",
      icon: <ResourcesIcon className={styles["sidebar-icon"]} />,
    },
    {
      name: "favorites",
      href: "/dashboard/favorites",
      icon: <FavoriteIcon className={styles["sidebar-icon"]} />,
    },
    {
      name: "logout",
      href: "/",
      icon: (
        <LogoutIcon
          className={`${styles["sidebar-icon"]} ${styles["sidebar-icon_house"]}`}
        />
      ),
    },
  ];

  return (
    <div className={styles["sidebar-container"]}>
      {links.map((link) => {
        if (link.name === "profile") {
          return (
            <Link href={link.href} key={link.name}>
              <div
                className={`${styles["sidebar-iconContainer"]} ${
                  pathName === link.href
                    ? styles["sidebar-sectionSelected"]
                    : ""
                }`}
              >
                {link.icon}
              </div>
            </Link>
          );
        }
        return null;
      })}

      <div className={styles["sidebar-content_center"]}>
        {links.map((link) => {
          if (centeredLinks.includes(link.name)) {
            const Icon = link.icon;
            return (
              <Link href={link.href} key={link.name}>
                <div
                  className={`${styles["sidebar-iconContainer"]} ${
                    pathName === link.href
                      ? styles["sidebar-sectionSelected"]
                      : ""
                  }`}
                >
                  {link.icon}
                </div>
              </Link>
            );
          }
          return null;
        })}
      </div>

      {links.map((link) => {
        if (link.name === "logout") {
          const Icon = link.icon;
          return (
            <button
              onClick={async () => {
                localStorage.clear();
                await signOut();
                router.push(link.href);
              }}
              key={link.name}
              className={styles["button-logout"]}
            >
              <div className="sidebar-iconContainer">{link.icon}</div>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};
