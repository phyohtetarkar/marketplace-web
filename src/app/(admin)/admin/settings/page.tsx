import {
  RiCalendarLine,
  RiDiscountPercentLine,
  RiEditBoxLine,
  RiGroupLine,
  RiMoneyDollarCircleLine,
} from "@remixicon/react";
import Link from "next/link";
import { ReactNode } from "react";

const SettingMenu = ({
  icon,
  title,
  subtitle,
  variant = "default",
}: {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: string;
  variant?:
    | "default"
    | "info"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "light";
}) => {
  return (
    <div role="button" className="card">
      <div className="card-body">
        <div className="hstack align-items-start gap-3">
          <div
            className={`hstack justify-content-center rounded-circle bg-${variant}`}
            style={{ width: 60, height: 60 }}
          >
            {icon}
          </div>
          <div className="vstack">
            <h6 className="fw-semibold mb-1">{title}</h6>
            <p className="small mb-0 text-muted">{subtitle ?? ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Settings() {
  return (
    <>
      <h2 className="mb-4">Settings</h2>

      <div className="text-uppercase small border-bottom pb-2 mb-3">
        Website
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxxl-4 g-3 mb-5">
        <div className="col">
          <Link
            href={"/admin/settings/staff-users"}
            className="text-decoration-none text-dark"
          >
            <SettingMenu
              icon={<RiGroupLine size={32} className="text-light" />}
              variant="success"
              title="Staff"
              subtitle="Manage staff users"
            />
          </Link>
        </div>
        <div className="col">
          <Link
            href={"/admin/settings/site-setting"}
            className="text-decoration-none text-dark"
          >
            <SettingMenu
              icon={<RiEditBoxLine size={32} className="text-dark" />}
              variant="default"
              title="Site Setting"
              subtitle="Manage site settings"
            />
          </Link>
        </div>
      </div>

      <div className="text-uppercase small border-bottom pb-2 mb-3">
        Subscriptions
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxxl-4 g-3 mb-5">
        <div className="col">
          <Link
            href={"/admin/settings/subscription-plans"}
            className="text-decoration-none text-dark"
          >
            <SettingMenu
              icon={
                <RiMoneyDollarCircleLine size={32} className="text-light" />
              }
              variant="primary"
              title="Subscription plans"
              subtitle="Manage subscription plans"
            />
          </Link>
        </div>

        <div className="col">
          <Link
            href={"/admin/settings/promo-codes"}
            className="text-decoration-none text-dark"
          >
            <SettingMenu
              icon={<RiDiscountPercentLine size={32} className="text-light" />}
              variant="warning"
              title="Promo codes"
              subtitle="Manage subscription promos"
            />
          </Link>
        </div>

        <div className="col">
          <Link
            href={"/admin/settings/subscription-history"}
            className="text-decoration-none text-dark"
          >
            <SettingMenu
              icon={<RiCalendarLine size={32} className="" />}
              variant="default"
              title="Subscription history"
              subtitle="View subscription logs"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
