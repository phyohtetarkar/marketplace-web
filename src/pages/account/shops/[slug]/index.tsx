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
import { ReactNode, useEffect, useState } from "react";
import { ShopDetailContext } from "../../../../common/contexts";
import { Shop } from "../../../../common/models";
import { parseErrorResponse } from "../../../../common/utils";
import { withAuthentication } from "../../../../common/WithAuthentication";
import Accordion from "../../../../components/Accordion";
import Alert from "../../../../components/Alert";
import Dropdown from "../../../../components/Dropdown";
import Loading from "../../../../components/Loading";
import { PendingOrderCountView } from "../../../../components/shop";
import ShopOrderListing from "../../../../components/shop/ShopOrderListing";
import {
  DiscountListing,
  ShopDashboard,
  ShopHeading,
  ShopProductListing,
  ShopReviewListing,
  ShopSetting
} from "../../../../components/shop";
import { getShopBySlug, isShopMember } from "../../../../services/ShopService";

const tabs = ["dashboard", "products", "discounts", "orders", "setting"];

function ShopDetail() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string | undefined>("dashboard");

  const [error, setError] = useState<string>();

  const [shop, setShop] = useState<Shop>();

  const [isMember, setIsMember] = useState(false);

  const iconSize = 20;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { slug, tab } = router.query;

    if (typeof tab === "string") {
      if (tabs.includes(tab)) {
        setActiveTab(tab);
      } else {
        router.replace({ pathname: router.basePath, query: { slug: slug } });
        return;
      }
    }

    if (typeof slug === "string") {
      loadShop(slug);
    }
  }, [router]);

  const loadShop = async (slug: string) => {
    try {
      var shop = await getShopBySlug(slug);
      if (!shop) {
        throw "Shop not found";
      }

      var isMember = await isShopMember(shop.id ?? 0);
      if (!isMember) {
        throw "FORBIDDEN";
      }
      setIsMember(isMember);
      setShop(shop);
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  };

  function menuLink({
    tab,
    title,
    active,
    icon,
    suffix
  }: {
    tab: string;
    title: string;
    active: boolean;
    icon: ReactNode;
    suffix?: ReactNode;
  }) {
    const path = router.basePath;
    return (
      <Link
        href={{
          pathname: path,
          query: { ...router.query, tab: tab }
        }}
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
          tab: "dashboard",
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
          tab: "products",
          title: "Products",
          active: activeTab === "products",
          icon: (
            <InboxStackIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
        {menuLink({
          tab: "discounts",
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
          tab: "orders",
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
          tab: "setting",
          title: "Setting",
          active: activeTab === "setting",
          icon: (
            <Cog6ToothIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
      </div>
    </>
  );

  const activeContent = () => {
    if (!shop) {
      return null;
    }
    switch (activeTab) {
      case "products":
        return <ShopProductListing shopId={shop.id!} />;
      case "reviews":
        return <ShopReviewListing shopId={shop.id!} hideEdit />;
      case "orders":
        return <ShopOrderListing shop={shop} />;
      case "discounts":
        return <DiscountListing shopId={shop.id!} />;
      case "setting":
        return <ShopSetting shop={shop} />;
    }

    return <ShopDashboard shopId={shop.id!} />;
  };

  const content = () => {
    if (error) {
      return <Alert message={error} variant="danger" />;
    }

    if (!shop) {
      return <Loading />;
    }

    if (!isMember) {
      return null;
    }

    const menu = (
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
    );

    return (
      <>
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
          <div className="col-12 col-lg-3">{menu}</div>
          <div className="col-12 col-lg-9">{activeContent()}</div>
        </div>
      </>
    );
  };

  return (
    <ShopDetailContext.Provider value={shop}>
      {shop && (
        <div className="header-bar">
          <div className="container py-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link href="/account/overview">My profile</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/account/shops">shops</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {shop.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      )}
      <div className="container py-3">
        <div className="row g-4 mb-5">
          <div className="col-12">{content()}</div>
        </div>
      </div>
      {/* <Modal id="generalEdit" show={editTab === "general"} variant="large">
        {(isShown) => {
          return (
            isShown && (
              <ShopGeneralEdit handleClose={() => setEditTab(undefined)} />
            )
          );
        }}
      </Modal>
      <Modal id="contactEdit" show={editTab === "contact"} variant="large">
        {(isShown) => {
          return (
            isShown && (
              <ShopContactEdit handleClose={() => setEditTab(undefined)} />
            )
          );
        }}
      </Modal> */}
    </ShopDetailContext.Provider>
  );
}

export default withAuthentication(ShopDetail);
