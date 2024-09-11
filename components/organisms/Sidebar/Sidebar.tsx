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
import { getEnabledRoutes } from "../../../feature/BlockedRoutesPrivateFeatureFlags/getEnabledRoutesPrivates";
// Type Guard to ensure link is not null
const isNonNullLink = (
  link: { name: string; href: string; icon: JSX.Element } | null
): link is { name: string; href: string; icon: JSX.Element } => {
  return link !== null;
};

export const Sidebar = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const isAdmin = session?.user?.admin === true;

  const allLinks = [
    {
      name: "profile",
      href: "/dashboard/profile",
      icon: <ProfileIcon className={styles["sidebar-icon"]} />,
    },
    isAdmin
      ? {
          name: "admin",
          href: "/dashboard/adminPanel",
          icon: (
            <AdminIcon
              className={`${styles["sidebar-icon"]} ${styles["admin-icon"]}`}
            />
          ),
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
  ].filter(isNonNullLink);

  const enabledRoutes = getEnabledRoutes(allLinks.map((link) => link.href));

  const visibleLinks = allLinks.filter((link) =>
    enabledRoutes.includes(link.href)
  );

  const isSelected = (linkHref: string) => {
    if (linkHref === "/dashboard") {
      return pathName === linkHref;
    }
    return pathName.startsWith(linkHref);
  };

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["sidebar-content_center"]}>
        {visibleLinks.map((link) => {
          if (link && ["profile", "admin"].includes(link.name)) {
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`${
                  isSelected(link.href) ? styles["sidebar-sectionSelected"] : ""
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
        {visibleLinks.map((link) => {
          if (
            link &&
            ["home", "path", "resources", "favorites"].includes(link.name)
          ) {
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

      {visibleLinks.map((link) => {
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
