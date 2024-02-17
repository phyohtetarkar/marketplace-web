"use client";
import Accordion from "@/components/Accordion";
import {
  RiFileList3Line,
  RiHeart3Line,
  RiSettings3Line,
  RiStore3Line,
  RiUser3Line
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const iconSize = 20;

function ProfileMenu() {
  const pathname = usePathname();

  function menuLink({
    href,
    title,
    icon
  }: {
    href: string;
    title: string;
    icon: ReactNode;
  }) {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`d-flex align-items-center p-2 my-list-item ${
          active ? "active" : ""
        }`}
      >
        {icon}
        <span>{title}</span>
      </Link>
    );
  }

  const content = (
    <>
      <div className="text-dark-gray mb-2 small px-1 uppercased d-none d-lg-block">
        ACCOUNT
      </div>
      <div className="vstack gap-1">
        {menuLink({
          href: "/profile",
          title: "Overview",
          icon: <RiUser3Line className="me-2" size={iconSize} />
        })}
        {menuLink({
          href: "/profile/favorites",
          title: "My favorites",
          icon: <RiHeart3Line className="me-2" size={iconSize} />
        })}
        {menuLink({
          href: "/profile/orders",
          title: "My orders",
          icon: <RiFileList3Line className="me-2" size={iconSize} />
        })}
        {menuLink({
          href: "/profile/shops",
          title: "My shops",
          icon: <RiStore3Line className="me-2" size={iconSize} />
        })}
        {menuLink({
          href: "/profile/setting",
          title: "Setting",
          icon: <RiSettings3Line className="me-2" size={iconSize} />
        })}
      </div>
    </>
  );

  // if (authContext.status !== "success") {
  //   return null;
  // }

  return (
    <div className="rounded border bg-white">
      <div className="d-block d-lg-none">
        <Accordion
          open={true}
          header={(open) => {
            return <span className="fw-bold">Menu</span>;
          }}
          headerClassName="px-3 py-2h"
          bodyClassName="border-top"
          iconType="plus-minus"
        >
          <div className="p-3">{content}</div>
        </Accordion>
      </div>

      <div className="p-3 d-none d-lg-block">{content}</div>
    </div>
  );
}

export default ProfileMenu;
