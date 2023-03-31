import {
  Cog8ToothIcon,
  ClipboardIcon,
  HeartIcon,
  UserIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Accordion from "../Accordion";

const iconSize = 20;

function AccountMenu({}) {
  const router = useRouter();

  function menuLink({
    href,
    title,
    icon
  }: {
    href: string;
    title: string;
    icon: ReactNode;
  }) {
    const active = router.pathname === href;
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
          href: "/account/overview",
          title: "Overview",
          icon: <UserIcon className="me-2" strokeWidth={2} width={iconSize} />
        })}
        {menuLink({
          href: "/account/favorites",
          title: "My favorites",
          icon: <HeartIcon className="me-2" strokeWidth={2} width={iconSize} />
        })}
        {menuLink({
          href: "/account/orders",
          title: "My orders",
          icon: (
            <ClipboardIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
        {menuLink({
          href: "/account/shops",
          title: "My shops",
          icon: (
            <BuildingStorefrontIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          )
        })}
        {menuLink({
          href: "/account/setting",
          title: "Setting",
          icon: (
            <Cog8ToothIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
      </div>
    </>
  );

  return (
    <div className="rounded shadow-sm bg-white">
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
    // <>
    //   <div
    //     className="card d-none d-lg-block sticky-lg-top"
    //     style={{
    //       top: 86
    //     }}
    //   >
    //     <div className="card-body">{content}</div>
    //   </div>
    //   <div className="accordion border rounded d-block d-lg-none">
    //     <div className="accordion-item">
    //       <div className="accordion-header">
    //         <button
    //           className="accordion-button fw-bold collapsed"
    //           data-bs-toggle="collapse"
    //           data-bs-target="#collapseMenu"
    //           aria-expanded="false"
    //           aria-controls="collapseMenu"
    //         >
    //           Menu
    //         </button>
    //       </div>

    //       <div
    //         id="collapseMenu"
    //         className="accordion-collapse collapse border-top"
    //       >
    //         <div className="accordion-body p-3">{content}</div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default AccountMenu;
