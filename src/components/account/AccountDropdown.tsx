import { AuthenticationContext } from "@/common/contexts";
import { parseErrorResponse } from "@/common/utils";
import { signOut } from "@/services/AuthService";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Dropdown from "../Dropdown";
import { useRouter } from "next/navigation";

interface AccountDropdownProps {
  onNavClick?: () => void;
}

function AccountDropdown(props: AccountDropdownProps) {
  const { onNavClick } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { status, user, update } = useContext(AuthenticationContext);

  if (status === "loading" || loading) {
    return (
      <div className="navbar-nav align-items-lg-center mt-3 mt-lg-0">
        <div
          className="spinner-border spinner-border-sm text-light-gray mx-auto"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status !== "success") {
    return null;
  }

  return (
    <div className="navbar-nav align-items-lg-center mt-3 mt-lg-0">
      <Dropdown
        toggle={<span className="">Hi, {user?.name ?? "User"}</span>}
        className="nav-item"
        toggleClassName="dropdown-toggle nav-link hstack"
        menuClassName="dropdown-menu-end"
      >
        <li>
          <Link
            href="/profile"
            className="dropdown-item text-decoration-none"
            onClick={(e) => onNavClick?.()}
          >
            My profile
          </Link>
        </li>
        <li>
          <Link
            href="/profile/favorites"
            className="dropdown-item text-decoration-none"
            onClick={(e) => onNavClick?.()}
          >
            My favorites
          </Link>
        </li>
        <li>
          <Link
            href="/profile/orders"
            className="dropdown-item text-decoration-none"
            onClick={(e) => onNavClick?.()}
          >
            My orders
          </Link>
        </li>
        <li>
          <Link
            href="/profile/shops"
            className="dropdown-item text-decoration-none"
            onClick={(e) => onNavClick?.()}
          >
            My shops
          </Link>
        </li>
        {user?.role?.match("ADMIN|OWNER") && (
          <>
            <div className="dropdown-divider"></div>
            <li>
              <Link
                href={"/admin"}
                target="_blank"
                className="dropdown-item text-decoration-none"
                onClick={(e) => onNavClick?.()}
              >
                Admin portal
              </Link>
            </li>
          </>
        )}
        <div className="dropdown-divider"></div>
        <li className="dropdown-item">
          <div
            role="button"
            onClick={() => {
              onNavClick?.();
              setLoading(true);
              signOut()
                .then(() => {
                  update("unauthorized");
                  router.push("/");
                })
                .catch((error) => {
                  toast.error(parseErrorResponse(error));
                })
                .finally(() => setLoading(false));
            }}
          >
            Logout
          </div>
        </li>
      </Dropdown>
    </div>
  );
}

export default AccountDropdown;
