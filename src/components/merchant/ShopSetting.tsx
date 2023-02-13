import { ReactNode, useContext, useState } from "react";
import { ShopDetailContext } from "../../common/contexts";
import Accordion from "../Accordion";
import ManageDiscounts from "./ManageDiscounts";
import ShopDashboard from "./ShopDashboard";

interface MenuItemProps {
  title: string;
  icon?: ReactNode;
  active: boolean;
  onClick?: () => void;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <div
      role="button"
      className={`d-flex align-items-center p-2 my-list-item ${
        props.active ? "active" : ""
      }`}
      onClick={(e) => {
        !props.active && props.onClick?.();
      }}
    >
      {props.icon}
      <span>{props.title}</span>
    </div>
  );
};

function ShopSetting() {
  const shopContext = useContext(ShopDetailContext);
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");

  const menus = (
    <div className="vstack gap-1">
      <MenuItem
        title="Dashboard"
        active={activeMenu === "dashboard"}
        onClick={() => {
          setActiveMenu("dashboard");
        }}
      />
      <MenuItem
        title="Discounts"
        active={activeMenu === "discounts"}
        onClick={() => {
          setActiveMenu("discounts");
        }}
      />
    </div>
  );

  const content = () => {
    if (activeMenu === "discounts") {
      return <ManageDiscounts shopId={shopContext?.id ?? 0} />;
    }

    return <ShopDashboard />;
  };

  return (
    <div className="row g-3">
      <div className="col-lg-3">
        <div className="card shadow-sm d-none d-lg-block">
          <div className="card-body p-2h">{menus}</div>
        </div>
        <div className="rounded shadow-sm bg-white d-block d-lg-none">
          <Accordion
            header={(open) => {
              return <span className="fw-bold">Menu</span>;
            }}
            headerClassName="px-3 py-2h"
            bodyClassName="border-top"
            iconType="plus-minus"
          >
            <div className="p-2h">{menus}</div>
          </Accordion>
        </div>
      </div>
      {/* <div className="bg-white rounded h-100 shadow-sm">
        <Tabs defaultTabKey="general" className="border-bottom">
          <Tabs.Tab tabKey="general" title="General">
            <ShopGeneralEdit />
          </Tabs.Tab>
          <Tabs.Tab tabKey="contact" title="Contact">
            <ShopContactEdit />
          </Tabs.Tab>
          <Tabs.Tab tabKey="branches" title="Branches">
            <BranchListing />
          </Tabs.Tab>
        </Tabs>
      </div> */}
      <div className="col-lg-9">{content()}</div>
    </div>
  );
}

export default ShopSetting;
