import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  InboxStackIcon,
  ReceiptPercentIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Shop } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import { getShopBySlug, isShopMember } from "../../services/ShopService";
import Accordion from "../Accordion";
import Alert from "../Alert";
import Dropdown from "../Dropdown";
import Loading from "../Loading";
import { ShopHeading } from "../shopdetail";
import PendingOrderCountView from "./PendingOrderCountView";

interface ShopManageProps {
  activeTab?: "dashboard" | "products" | "discounts" | "orders" | "setting";
  children: (shop: Shop) => ReactNode;
}

const iconSize = 20;

function ShopManage(props: ShopManageProps) {
  const { activeTab, children } = props;

  const router = useRouter();

  const [error, setError] = useState<string>();

  const [shop, setShop] = useState<Shop>();

  const [isLoading, setLoading] = useState(false);

  const initRef = useRef(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { slug } = router.query;

    if (typeof slug === "string") {
      !initRef.current && loadShop(slug);
    }

    initRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const loadShop = async (slug: string) => {
    try {
      setLoading(true);
      var shop = await getShopBySlug(slug);
      if (!shop) {
        throw "Shop not found";
      }

      var isMember = await isShopMember(shop.id ?? 0);
      if (!isMember) {
        router.push("/account/shops");
        return;
      }
      setShop(shop);
    } catch (error) {
      setError(parseErrorResponse(error));
    } finally {
      setLoading(false);
    }
  };

  function menuLink({
    path,
    title,
    active,
    icon,
    suffix
  }: {
    path: string;
    title: string;
    active: boolean;
    icon: ReactNode;
    suffix?: ReactNode;
  }) {
    const href = `/account/shops/${shop?.slug}/${path}`;
    return (
      <Link
        href={href}
        replace
        className={`d-flex align-items-center p-2 my-list-item ${
          active ? "active" : ""
        }`}
        onClick={(e) => {
          active && e.preventDefault();
        }}
      >
        {icon}
        <span>{title}</span>
        <div className="flex-grow-1"></div>
        {suffix}
      </Link>
    );
  }

  const menus = (
    <>
      <div className="vstack gap-1">
        {menuLink({
          path: `dashboard`,
          title: "Dashboard",
          active: activeTab === "dashboard",
          icon: (
            <ComputerDesktopIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          )
        })}
        {menuLink({
          path: `products`,
          title: "Products",
          active: activeTab === "products",
          icon: (
            <InboxStackIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
        {menuLink({
          path: `discounts`,
          title: "Discount",
          active: activeTab === "discounts",
          icon: (
            <ReceiptPercentIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          )
        })}
        {menuLink({
          path: `orders`,
          title: "Orders",
          active: activeTab === "orders",
          icon: (
            <DocumentTextIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          ),
          suffix: <>{shop && <PendingOrderCountView shopId={shop.id ?? 0} />}</>
        })}
        {menuLink({
          path: `setting`,
          title: "Setting",
          active: activeTab === "setting",
          icon: (
            <Cog6ToothIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
      </div>
    </>
  );

  if (isLoading) {
    return (
      <div className="container py-3">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-3">
        <Alert message={error} variant="danger" />
      </div>
    );
  }

  if (!shop) {
    return <></>;
  }

  return (
    <>
      <div className="header-bar">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/account/overview">Profile</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/account/shops">Shops</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {shop.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container py-3">
        <div className="position-relative border rounded bg-white vstack overflow-hidden mb-3">
          <ShopHeading shop={shop} />

          <Dropdown
            toggle={<AdjustmentsHorizontalIcon width={24} strokeWidth={1.5} />}
            className="position-absolute top-0 end-0 m-3"
            toggleClassName="btn btn-light shadow-sm"
            menuClassName="shadow"
          >
            <li role="button" className="dropdown-item-primary">
              Upload Logo
            </li>
            <li role="button" className="dropdown-item-primary">
              Upload Cover
            </li>
          </Dropdown>
        </div>
        <div className="row g-3">
          <div className="col-12 col-lg-3">
            <div className="rounded border bg-white">
              <Accordion
                open={true}
                header={(open) => {
                  return <span className="fw-bold">Menu</span>;
                }}
                headerClassName="px-3 py-2h border-bottom d-flex d-lg-none"
                bodyClassName=""
                iconType="plus-minus"
              >
                <div className="p-3">{menus}</div>
              </Accordion>
            </div>
          </div>
          <div className="col-12 col-lg-9">{children(shop)}</div>
        </div>
      </div>
    </>
  );
}

export default ShopManage;
