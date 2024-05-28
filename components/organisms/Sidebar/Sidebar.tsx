"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardIcon,
  ProfileIcon,
  ResourcesIcon,
} from "../../atoms/icons/sidebarIcons";
import { signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.css";
import { PathIcon } from "../../atoms/icons/sidebarIcons/PathIcon";
import { FavoriteIcon } from "../../atoms/icons/sidebarIcons/FavoriteIcon";
import { LogoutIcon } from "../../atoms/icons/sidebarIcons/LogoutIcon";
import { AdminIcon } from "../../atoms/icons/sidebarIcons/AdminIcon";

export const Sidebar = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const centeredLinks = ["home", "resources", "favorites", "path"];
  const topLinks = ["profile", "admin"];

  const isAdmin = session?.user?.admin === true;

  const links = [
    {
      name: "profile",
      href: "/dashboard/profile",
      icon: <ProfileIcon className={styles["sidebar-icon"]} />,
    },
    isAdmin
      ? {
          name: "admin",
          href: "/dashboard/adminPanel",
          icon: <AdminIcon className={`${styles["sidebar-icon"]} ${styles["admin-icon"]}`} />,
        }
      : null,
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
      href: "/dashboard/courses",
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
      href: "/login",
      icon: (
        <LogoutIcon
          className={`${styles["sidebar-icon"]} ${styles["sidebar-icon_house"]}`}
        />
      ),
    },
  ].filter(Boolean);

  const isSelected = (linkHref: string) => {
    if (linkHref === "/dashboard") {
      return pathName === linkHref;
    }
    return pathName.startsWith(linkHref);
  };

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["sidebar-content_center"]}>
        {links.map((link) => {
          if (link && topLinks.includes(link.name)) {
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`${
                  isSelected(link.href)
                    ? styles["sidebar-sectionSelected"]
                    : ""
                }`}
              >
                {link.icon}
              </Link>
            );
          }
          return null;
        })}
      </div>

      <div className={styles["sidebar-content_center"]}>
        {links.map((link) => {
          if (link && centeredLinks.includes(link.name)) {
            return (
              <Link href={link.href} key={link.name}>
                <div
                  className={`${styles["sidebar-iconContainer"]} ${
                    isSelected(link.href)
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
        if (link && link.name === "logout") {
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
