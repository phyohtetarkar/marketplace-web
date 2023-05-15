import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../common/contexts";
import { parseErrorResponse } from "../../common/utils";
import { signOut } from "../../services/AuthService";
import Dropdown from "../Dropdown";

interface AccountDropdownProps {
  onNavClick?: () => void;
}

function AccountDropdown(props: AccountDropdownProps) {
  const { onNavClick } = props;

  const authContext = useContext(AuthenticationContext);

  if (authContext.status !== "success") {
    return null;
  }

  const { name, role } = authContext.payload ?? {};

  return (
    <Dropdown
      toggle={<span className="">Hi, {name ?? ""}</span>}
      className="nav-item"
      toggleClassName="dropdown-toggle nav-link hstack"
      menuClassName="dropdown-menu-end"
    >
      <li>
        <Link
          href="/account/overview"
          className="dropdown-item text-decoration-none"
          onClick={(e) => onNavClick?.()}
        >
          My profile
        </Link>
      </li>
      <li>
        <Link
          href="/account/favorites"
          className="dropdown-item text-decoration-none"
          onClick={(e) => onNavClick?.()}
        >
          My favorites
        </Link>
      </li>
      <li>
        <Link
          href="/account/orders"
          className="dropdown-item text-decoration-none"
          onClick={(e) => onNavClick?.()}
        >
          My orders
        </Link>
      </li>
      <li>
        <Link
          href="/account/shops"
          className="dropdown-item text-decoration-none"
          onClick={(e) => onNavClick?.()}
        >
          My shops
        </Link>
      </li>
      {role?.match("ADMIN|OWNER") && (
        <>
          <div className="dropdown-divider"></div>
          <li>
            <a
              href={"http://localhost:3080"}
              target="_blank"
              rel="noreferrer"
              className="dropdown-item text-decoration-none"
              onClick={(e) => onNavClick?.()}
            >
              Admin protal
            </a>
          </li>
        </>
      )}
      <div className="dropdown-divider"></div>
      <li className="dropdown-item">
        <div
          role="button"
          onClick={() => {
            onNavClick?.();
            //Auth.signOut().catch(console.error);
            signOut()
              .then(() => {
                authContext.update("unauthorized", undefined);
                // sessionStorage.removeItem("accessToken");
              })
              .catch((error) => {
                toast.error(parseErrorResponse(error));
              });
          }}
        >
          Logout
        </div>
      </li>
    </Dropdown>
  );
}

export default AccountDropdown;
