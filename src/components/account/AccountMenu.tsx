import Link from "next/link";
import { useRouter } from "next/router";
import { Clipboard, Link as Link1, Lock, User } from "react-feather";

const iconSize = 18;

function AccountMenu({}) {
  const router = useRouter();

  function menuLink({ href, title, icon }) {
    const active = router.pathname === href;
    return (
      <Link href={href}>
        <a
          className={`d-flex align-items-center p-2 my-list-item ${
            active ? "active" : ""
          }`}
        >
          {icon}
          <span>{title}</span>
        </a>
      </Link>
    );
  }

  const content = (
    <>
      <div className="text-dark-gray mb-2 small px-1 uppercased">
        ACCOUNT SETTINGS
      </div>
      <div className="vstack gap-1">
        {menuLink({
          href: "/profile/overview",
          title: "Profile overview",
          icon: <User className="me-2" size={iconSize} />,
        })}
        {menuLink({
          href: "/profile/orders-history",
          title: "Orders history",
          icon: <Clipboard className="me-2" size={iconSize} />,
        })}
        {menuLink({
          href: "/profile/setting",
          title: "Profile Setting",
          icon: <Link1 className="me-2" size={iconSize} />,
        })}
      </div>
    </>
  );

  return (
    <>
      <div
        className="card d-none d-lg-block sticky-lg-top"
        style={{
          top: 86,
        }}
      >
        <div className="card-body">{content}</div>
      </div>
      <div className="accordion border rounded d-block d-lg-none">
        <div className="accordion-item">
          <div className="accordion-header">
            <button
              className="accordion-button fw-bold collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMenu"
              aria-expanded="false"
              aria-controls="collapseMenu"
            >
              Menu
            </button>
          </div>

          <div
            id="collapseMenu"
            className="accordion-collapse collapse border-top"
          >
            <div className="accordion-body p-3">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountMenu;
