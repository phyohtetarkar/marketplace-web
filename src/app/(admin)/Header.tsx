"use client";
import { AuthenticationContext } from "@/common/contexts";
import { useLocalization } from "@/common/hooks";
import { parseErrorResponse } from "@/common/utils";
import Dropdown from "@/components/Dropdown";
import { signOut } from "@/services/AuthService";
import { RiAccountCircleFill, RiMenuLine } from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

function Header({ onBarClick }: { onBarClick: () => void }) {
  const { status, user, update } = useContext(AuthenticationContext);
  const router = useRouter();
  const { locale, change } = useLocalization();

  return (
    <nav
      className="navbar sticky-top navbar-expand navbar-light bg-white border-bottom"
      style={{ height: 70 }}
    >
      <div className="container-fluid px-3">
        <div
          role="button"
          className="navbar-brand d-none d-lg-block"
          onClick={() => onBarClick?.()}
        >
          <RiMenuLine size={24} />
        </div>

        <ul className="navbar-nav ms-auto">
          <Dropdown
            toggle={<span>{locale.toUpperCase()}</span>}
            className="nav-item"
            toggleClassName="dropdown-toggle nav-link hstack"
            menuClassName="dropdown-menu-end"
          >
            <li
              role="button"
              className="dropdown-item"
              onClick={() => change("mm")}
            >
              Myanmar
            </li>
            <div className="dropdown-divider"></div>
            <li
              role="button"
              className="dropdown-item"
              onClick={() => change("en")}
            >
              English
            </li>
          </Dropdown>
          {user && (
            <Dropdown
              toggle={
                <div className="hstack gap-2">
                  <RiAccountCircleFill size={24} />
                  {user.name ?? "User"}
                </div>
              }
              className="nav-item"
              toggleClassName="dropdown-toggle hstack nav-link"
              menuClassName="dropdown-menu-end"
            >
              <Link
                href={"/profile"}
                className="dropdown-item"
                role="button"
                target="_blank"
              >
                My profile
              </Link>
              <div className="dropdown-divider"></div>
              <li
                className="dropdown-item"
                role="button"
                onClick={() => {
                  signOut()
                    .then(() => {
                      update("unauthorized");
                      router.push("/login");
                    })
                    .catch((error) => {
                      toast.error(parseErrorResponse(error));
                    });
                }}
              >
                Sign out
              </li>
            </Dropdown>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
