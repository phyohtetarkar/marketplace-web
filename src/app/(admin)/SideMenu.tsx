"use client";
/* eslint-disable @next/next/no-img-element */
import {
  RiBookmarkLine,
  RiBox3Line,
  RiComputerLine,
  RiGroupLine,
  RiImageLine,
  RiMap2Line,
  RiSettings3Line,
  RiStore2Line
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MenuItemProps {
  to: string;
  label: string;
  icon: ReactNode;
  expanded: boolean;
  children?: ReactNode;
}

function MenuItem({ to, label, icon, expanded, children }: MenuItemProps) {
  const pathname = usePathname();

  const isActive = to == pathname;
  return (
    <li className={`nav-item mb-2 ${expanded ? "px-lg-2" : ""}`}>
      {expanded ? (
        <Link
          href={to}
          className={`nav-link px-2 custom-nav-link rounded-1 ${
            isActive ? "active" : ""
          }`}
          replace
        >
          <div className="hstack">
            {icon}
            <span className="ms-2">{label}</span>
            {children}
          </div>
        </Link>
      ) : (
        <Link
          href={to}
          className={`nav-link px-2 py-3 custom-nav-link ${
            isActive ? "active" : ""
          }`}
          replace
        >
          <div className="d-flex justify-content-center">{icon}</div>
        </Link>
      )}
    </li>
  );
}

function SideMenu({ expanded = true }) {
  return (
    <div className="d-flex flex-column flex-shrink-0 h-100 text-light">
      <div
        className={`hstack text-white custom-border-bottom ${
          expanded ? "px-3" : "justify-content-center"
        }`}
        style={{
          minHeight: 70,
        }}
      >
        <img src="/images/logo.png" width={36} height={36} alt="" />
        {/* <RiShoppingBasketFill size={32} className="text-primary" /> */}
        {expanded && (
          <h4 className="mb-0 ms-3 fw-bold">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h4>
        )}
      </div>

      <div
        className="scrollbar-none"
        style={{
          overflowY: "auto",
        }}
      >
        <ul
          className={`nav flex-column text-center ${
            expanded ? "text-lg-start" : ""
          } mb-auto pt-2`}
        >
          <MenuItem
            to="/admin"
            icon={<RiComputerLine size={!expanded ? 24 : 20} />}
            label="Dashboard"
            expanded={expanded}
          />
          <div className="custom-border-bottom"></div>
          {expanded && (
            <span className="text-white-50 my-3 small fw-bold px-3 text-uppercase">
              CONTENTS
            </span>
          )}
          <MenuItem
            to="/admin/banners"
            icon={<RiImageLine size={!expanded ? 24 : 20} />}
            label="Banners"
            expanded={expanded}
          />
          <MenuItem
            to="/admin/categories"
            icon={<RiBookmarkLine size={!expanded ? 24 : 20} />}
            label="Categories"
            expanded={expanded}
          />

          <MenuItem
            to="/admin/cities"
            icon={<RiMap2Line size={!expanded ? 24 : 20} />}
            label="Cities"
            expanded={expanded}
          />

          {/* <div className="custom-border-bottom"></div>
          {expanded && (
            <span className="text-white-50 my-3 small fw-bold px-3 text-uppercase">
              CONTENTS
            </span>
          )} */}

          <MenuItem
            to="/admin/shops"
            icon={<RiStore2Line size={!expanded ? 24 : 20} />}
            label="Shops"
            expanded={expanded}
          />

          <MenuItem
            to="/admin/products"
            icon={<RiBox3Line size={!expanded ? 24 : 20} />}
            label="Products"
            expanded={expanded}
          />

          <div className="custom-border-bottom mb-2"></div>

          <MenuItem
            to="/admin/users"
            icon={<RiGroupLine size={!expanded ? 24 : 20} />}
            label="Users"
            expanded={expanded}
          />

          <MenuItem
            to="/admin/settings"
            icon={<RiSettings3Line size={!expanded ? 24 : 20} />}
            label="Settings"
            expanded={expanded}
          />
        </ul>
      </div>
      {/* <div
        className={`custom-border-top d-flex align-items-center px-lg-3`}
        style={{ minHeight: 70 }}
      >
      </div> */}
    </div>
  );
}

export default SideMenu;
