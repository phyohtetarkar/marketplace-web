import {
  AdjustmentsHorizontalIcon,
  CubeIcon,
  InformationCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { ShopDetailContext } from "../../../../common/contexts";
import { Shop } from "../../../../common/models";
import { parseErrorResponse } from "../../../../common/utils";
import { withAuthentication } from "../../../../common/WithAuthentication";
import AccountMenu from "../../../../components/account/AccountMenu";
import Alert from "../../../../components/Alert";
import Dropdown from "../../../../components/Dropdown";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import Rating from "../../../../components/Rating";
import {
  AboutUs,
  DiscountListing,
  ShopContactEdit,
  ShopDashboard,
  ShopGeneralEdit,
  ShopProductListing,
  ShopReviewListing,
  ShopSetting
} from "../../../../components/shopdetail";
import ContactUs from "../../../../components/shopdetail/ContactUs";
import Tabs from "../../../../components/Tabs";
import { getShopById, isShopMember } from "../../../../services/ShopService";

type PageTab =
  | "products"
  | "reviews"
  | "about-us"
  | "contact-us"
  | "orders"
  | "settings"
  | "insights"
  | "discounts"
  | "more";

type EditTab = "general" | "contact";

function ShopDetail() {
  const router = useRouter();

  const [editTab, setEditTab] = useState<EditTab>();

  const [activeTab, setActiveTab] = useState<PageTab | undefined>("insights");

  const [error, setError] = useState<string>();

  const [shop, setShop] = useState<Shop>();

  const [productEdit, setProductEdit] = useState(false);

  const iconSize = 20;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { shopId } = router.query;

    if (typeof shopId === "string") {
      isShopMember(parseInt(shopId))
        .then((isMember) => {
          if (isMember) {
            loadShop(parseInt(shopId));
          } else {
            router.back();
          }
        })
        .catch((error) => {
          router.back();
        });
    }
  }, [router]);

  const loadShop = async (shopId: number) => {
    try {
      var shop = await getShopById(shopId);
      setShop(shop);
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  };

  function menuLink({
    href,
    title,
    active,
    icon
  }: {
    href: string;
    title: string;
    active: boolean;
    icon: ReactNode;
  }) {
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
      </Link>
    );
  }

  const menus = (
    <>
      <div className="vstack gap-1">
        {menuLink({
          href: "/shops/id#products",
          title: "Products",
          active: activeTab === "products",
          icon: <CubeIcon className="me-2" strokeWidth={2} width={iconSize} />
        })}
        {menuLink({
          href: "/shops/id#reviews",
          title: "Reviews",
          active: activeTab === "reviews",
          icon: <StarIcon className="me-2" strokeWidth={2} width={iconSize} />
        })}
        {menuLink({
          href: "/shops/id#about-us",
          title: "About us",
          active: activeTab === "about-us",
          icon: (
            <InformationCircleIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
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
        return <ShopProductListing shop={shop} isMember={true} />;
      case "reviews":
        return <ShopReviewListing shopId={shop.id!} hideEdit />;
      case "about-us":
        return <AboutUs />;
      case "contact-us":
        return <ContactUs />;
      case "orders":
        return null;
      case "insights":
        return <ShopDashboard />;
      case "discounts":
        return <DiscountListing shopId={shop.id!} />;
      case "settings":
        return <ShopSetting />;
    }

    return null;
  };

  const content = () => {
    if (error) {
      return <Alert message={error} variant="danger" />;
    }

    if (!shop) {
      return <Loading />;
    }

    const heading = (
      <>
        <h5 className="mb-0">{shop.name}</h5>
        <div className="text-muted small mb-1 text-truncate">
          {shop.headline}
        </div>
      </>
    );

    return (
      <>
        <div className="shadow-sm rounded bg-white vstack overflow-hidden mb-3">
          <div
            style={{
              width: "100%",
              minHeight: 200
            }}
            className="position-relative bg-primary"
          >
            {shop?.coverUrl && (
              <Image
                src={shop.coverUrl}
                alt=""
                fill
                priority
                style={{
                  objectFit: "cover"
                }}
              />
            )}
            <Dropdown
              toggle={
                <AdjustmentsHorizontalIcon width={24} strokeWidth={1.5} />
              }
              className="position-absolute top-0 end-0 m-3"
              toggleClassName="btn btn-light shadow-sm"
              menuClassName="shadow"
            >
              <li
                role="button"
                className="dropdown-item-primary"
                onClick={() => setEditTab("general")}
              >
                Update info
              </li>
              <li
                role="button"
                className="dropdown-item-primary"
                onClick={() => setEditTab("contact")}
              >
                Update contact
              </li>
              <div className="dropdown-divider"></div>
              <li role="button" className="dropdown-item-primary">
                Upload Logo
              </li>
              <li role="button" className="dropdown-item-primary">
                Upload Cover
              </li>
            </Dropdown>
          </div>
          <div className="row p-3 py-sm-4" style={{ zIndex: 999 }}>
            <div className="col">
              <div className="hstack">
                <div className="flex-shrink-0 mt-n6">
                  <div className="bg-white p-1 pb-0 rounded position-relative">
                    <Image
                      src={shop?.logoUrl ?? "/images/placeholder.jpeg"}
                      width={100}
                      height={100}
                      alt=""
                      className="rounded-1"
                      style={{
                        objectFit: "cover"
                      }}
                    />
                    {/* {isMember && (
                        <div
                          role="button"
                          className="position-absolute bg-dark rounded-bottom py-1 text-center bg-opacity-50 bottom-0 start-0 end-0"
                        >
                          <span className="small text-light">Edit</span>
                        </div>
                      )} */}
                  </div>
                </div>
                <div className="ms-3 flex-column mt-n2 mt-sm-n3 d-none d-md-flex">
                  {heading}
                </div>
              </div>
            </div>
            <div className="col-12 mt-2 d-block d-md-none">
              <div className="vstack">{heading}</div>
            </div>
            <div className="col-sm-auto">
              <div className="mt-sm-0 gap-1 hstack" style={{ zIndex: 999 }}>
                <div className="flex-grow-1 d-none d-md-block"></div>
                <div className="hstack gap-1">
                  <Rating rating={shop?.rating ?? 0} />
                  <span className="text-dark-gray">
                    {shop?.rating?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-top">
            <Tabs
              defaultTabKey={"insights"}
              onTabChange={(key) => {
                setActiveTab(key as PageTab);
              }}
            >
              <Tabs.Tab tabKey="insights" title="Insights">
                <div></div>
              </Tabs.Tab>
              <Tabs.Tab tabKey="products" title="Products">
                <div></div>
              </Tabs.Tab>
              <Tabs.Tab tabKey="reviews" title="Reviews">
                <div></div>
              </Tabs.Tab>
              {/* <Tabs.Tab
                tabKey="about-us"
                title="About us"
                tabClassName="text-nowrap"
              >
                <div></div>
              </Tabs.Tab> */}
              <Tabs.Tab
                tabKey="orders"
                title={
                  <div className="hstack gap-2">
                    Orders
                    <small className="bg-danger rounded px-1 text-light">
                      {shop?.pendingOrderCount ?? 0}
                    </small>
                  </div>
                }
                tabClassName="text-nowrap"
              >
                <div></div>
              </Tabs.Tab>
              <Tabs.Tab
                tabKey="discounts"
                title="Discounts"
                tabClassName="text-nowrap"
              >
                <div></div>
              </Tabs.Tab>
              {/* <Tabs.Tab
                tabKey="more"
                title={(onTabChange, isActive) => {
                  return (
                    <div>
                      <Dropdown
                        toggle="More"
                        toggleClassName={`dropdown-toggle nav-link py-3 ${
                          isActive ? "active" : ""
                        }`}
                        popperConfig={{
                          strategy: "fixed"
                        }}
                        menuClassName="shadow border-0"
                      >
                        <li
                          role="button"
                          className="dropdown-item"
                          onClick={() => {
                            onTabChange();
                            setActiveTab("insights");
                          }}
                        >
                          Insights
                        </li>
                        <li
                          role="button"
                          className="dropdown-item"
                          onClick={() => {
                            onTabChange();
                            setActiveTab("discounts");
                          }}
                        >
                          Discounts
                        </li>
                      </Dropdown>
                    </div>
                  );
                }}
                tabClassName="text-nowrap"
              >
                <div></div>
              </Tabs.Tab> */}
            </Tabs>
          </div>
        </div>

        {activeContent()}
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
                  <Link href="/account/shops">My shops</Link>
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
          {/* <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div> */}
          <div className="col-12">{content()}</div>
        </div>
      </div>
      <Modal id="generalEdit" show={editTab === "general"} variant="large">
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
      </Modal>
    </ShopDetailContext.Provider>
  );
}

export default withAuthentication(ShopDetail);
