import { Auth } from "aws-amplify";
import Link from "next/link";
import { useLoginUser } from "../../common/hooks";
import Dropdown from "../Dropdown";

interface AccountDropdownProps {
  onNavClick?: () => void;
}

function AccountDropdown(props: AccountDropdownProps) {
  const { onNavClick } = props;

  const { user, error, isLoading } = useLoginUser();

  if (isLoading || error) {
    return null;
  }

  return (
    <Dropdown
      toggle={<span className="">Hi, {user?.name ?? ""}</span>}
      className="nav-item"
      toggleClassName="dropdown-toggle hstack"
      menuClassName="dropdown-menu-end"
    >
      <li>
        <Link href="/account/overview">
          <a
            className="dropdown-item text-decoration-none"
            onClick={(e) => onNavClick?.()}
          >
            My profile
          </a>
        </Link>
      </li>
      <li>
        <Link href="/account/favorites">
          <a
            className="dropdown-item text-decoration-none"
            onClick={(e) => onNavClick?.()}
          >
            My favorites
          </a>
        </Link>
      </li>
      <li>
        <Link href="/account/orders">
          <a
            className="dropdown-item text-decoration-none"
            onClick={(e) => onNavClick?.()}
          >
            My orders
          </a>
        </Link>
      </li>
      {user?.role?.match("ADMIN|OWNER") && (
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
              Site manage
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
            Auth.signOut().catch(console.error);
          }}
        >
          Logout
        </div>
      </li>
    </Dropdown>
  );
}

export default AccountDropdown;
