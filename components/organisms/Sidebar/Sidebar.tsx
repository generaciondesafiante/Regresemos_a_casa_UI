"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bookmark,
  Face,
  Favorite,
  Folder,
  Home,
  Logout,
} from "@mui/icons-material";
import { signOut } from "next-auth/react";
import styles from "./Sidebar.module.css";

const links = [
  { name: "profile", href: "/dashboard/profilepage", icon: Face },
  { name: "home", href: "/dashboard", icon: Home },
  { name: "path", href: "/dashboard/path", icon: Bookmark },
  { name: "resources", href: "/dashboard/resources", icon: Folder },
  { name: "favorites", href: "/dashboard/favorites", icon: Favorite },
  { name: "logout", href: "/", icon: Logout },
];

export const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const centeredLinks = ["home", "resources", "favorites", "path"];

  return (
    <div className={styles["sidebar-container"]}>
      {links.map((link) => {
        if (link.name === "profile") {
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
                <Icon className={styles["sidebar-icon"]} />
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
                  <Icon className={styles["sidebar-icon"]} />
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
                await signOut(); // Cierra la sesión
                router.push(link.href); // Redirige al usuario a la página de inicio de sesión
              }}
              key={link.name}
            >
              <div className="sidebar-iconContainer">
                <Icon className={styles["sidebar-icon"]} />
              </div>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
};
