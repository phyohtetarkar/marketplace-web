import {
  AdjustmentsHorizontalIcon,
  CubeIcon,
  InformationCircleIcon,
  MapPinIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { ShopDetailContext } from "../../../common/contexts";
import { Shop } from "../../../common/models";
import Dropdown from "../../../components/Dropdown";
import Loading from "../../../components/Loading";
import {
  DiscountListing,
  ShopContactEdit,
  ShopDashboard,
  ShopGeneralEdit,
  ShopSetting
} from "../../../components/shopdetail";
import Modal from "../../../components/Modal";
import { ProductEdit } from "../../../components/product";
import Rating from "../../../components/Rating";
import {
  AboutUs,
  ShopProductListing,
  ShopReviewListing
} from "../../../components/shopdetail";
import ContactUs from "../../../components/shopdetail/ContactUs";
import Tabs from "../../../components/Tabs";
import { ProductQuery } from "../../../services/ProductService";
import { getShopBySlug, isShopMember } from "../../../services/ShopService";

type PageTab =
  | "products"
  | "branches"
  | "reviews"
  | "about-us"
  | "contact-us"
  | "orders"
  | "settings"
  | "insights"
  | "discounts"
  | "more";

type EditTab = "general" | "contact";

function ShopHome({ shop }: { shop: Shop }) {
  const router = useRouter();

  const { tab } = router.query;

  const [editTab, setEditTab] = useState<EditTab>();

  const [activeTab, setActiveTab] = useState<PageTab | undefined>(
    (tab as PageTab) ?? "products"
  );

  const [pendingProductId, setPendingProductId] = useState<number>();
  const [pendingQuery, setPendingQuery] = useState<ProductQuery>();

  const [isMember, setMember] = useState<boolean>();

  const iconSize = 20;

  // useEffect(() => {
  //   if (router.isReady) {
  //     const array = router.asPath.split("#");
  //     const tab = array[array.length - 1];
  //     if (array.length > 1) {
  //       setActiveTab(tab as PageTab);
  //     } else {
  //       setActiveTab("products");
  //     }
  //   }
  // }, [router]);

  useEffect(() => {
    isShopMember(shop.id ?? 0)
      .then(setMember)
      .catch((error) => {
        setMember(false);
      });
  }, [shop]);

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
          href: "/shops/id#branches",
          title: "Branches",
          active: activeTab === "branches",
          icon: <MapPinIcon className="me-2" strokeWidth={2} width={iconSize} />
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
    switch (activeTab) {
      case "products":
        if (isMember === undefined) {
          return <Loading />;
        }
        return (
          <ShopProductListing
            shop={shop}
            isMember={isMember}
            onProductCreate={(query) => {
              setPendingQuery(query);
              setPendingProductId(0);
            }}
            onProductEdit={(id, query) => {
              setPendingQuery(query);
              setPendingProductId(id);
            }}
          />
        );
      case "reviews":
        return <ShopReviewListing shopId={shop.id!} />;
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

  const heading = (
    <>
      <h5 className="mb-0">{shop.name}</h5>
      <div className="text-muted small mb-1 text-truncate">{shop.headline}</div>
    </>
  );

  if (pendingProductId !== undefined) {
    return (
      <ProductEdit
        shop={shop}
        productId={pendingProductId}
        pendingQuery={pendingQuery}
        onPopBack={() => {
          setPendingProductId(undefined);
          setPendingQuery(undefined);
        }}
      />
    );
  }

  return (
    <>
      <div className="vstack">
        <div className="header-bar">
          <div className="container">
            <div className="row py-4">
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-light">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/shops" className="text-light">
                      Shops
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {shop.name}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="container py-3">
          <div className="row">
            <div className="col-12">
              <div className="shadow-sm rounded bg-white vstack overflow-hidden">
                <div
                  style={{
                    width: "100%",
                    minHeight: 200
                  }}
                  className="position-relative bg-primary"
                >
                  {shop.coverUrl && (
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
                  {isMember && (
                    <Dropdown
                      toggle={
                        <AdjustmentsHorizontalIcon
                          width={24}
                          strokeWidth={1.5}
                        />
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
                  )}
                </div>
                <div className="row p-3 py-sm-4" style={{ zIndex: 999 }}>
                  <div className="col">
                    <div className="hstack">
                      <div className="flex-shrink-0 mt-n6">
                        <div className="bg-white p-1 pb-0 rounded position-relative">
                          <Image
                            src={shop.logoUrl ?? "/images/placeholder.jpeg"}
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
                    <div
                      className="mt-sm-0 gap-1 hstack"
                      style={{ zIndex: 999 }}
                    >
                      <div className="flex-grow-1 d-none d-md-block"></div>
                      <div className="hstack gap-1">
                        <Rating rating={shop.rating ?? 0} />
                        <span className="text-dark-gray">
                          {shop.rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-top">
                  <Tabs
                    defaultTabKey="products"
                    onTabChange={(key) => {
                      setActiveTab(key as PageTab);
                    }}
                  >
                    <Tabs.Tab tabKey="products" title="Products">
                      <div></div>
                    </Tabs.Tab>
                    <Tabs.Tab tabKey="reviews" title="Reviews">
                      <div></div>
                    </Tabs.Tab>
                    <Tabs.Tab tabKey="branches" title="Branches" hidden>
                      <div></div>
                    </Tabs.Tab>
                    <Tabs.Tab
                      tabKey="about-us"
                      title="About us"
                      tabClassName="text-nowrap"
                    >
                      <div></div>
                    </Tabs.Tab>
                    {/* <Tabs.Tab
                    tabKey="contact-us"
                    title="Contact us"
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
                            10
                          </small>
                        </div>
                      }
                      tabClassName="text-nowrap"
                      hidden={!isMember}
                    >
                      <div></div>
                    </Tabs.Tab>
                    <Tabs.Tab
                      tabKey="settings"
                      title="Settings"
                      tabClassName="text-nowrap"
                      hidden={true}
                    >
                      <div></div>
                    </Tabs.Tab>
                    <Tabs.Tab
                      tabKey="more"
                      hidden={!isMember}
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
                    </Tabs.Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="row py-4 g-4">
            <div className="col-12">
              <ShopDetailContext.Provider value={shop}>
                <>
                  {activeContent()}
                  <Modal
                    id="generalEdit"
                    show={editTab === "general"}
                    variant="large"
                  >
                    {(isShown) => {
                      return (
                        isShown && (
                          <ShopGeneralEdit
                            handleClose={() => setEditTab(undefined)}
                          />
                        )
                      );
                    }}
                  </Modal>
                  <Modal
                    id="contactEdit"
                    show={editTab === "contact"}
                    variant="large"
                  >
                    {(isShown) => {
                      return (
                        isShown && (
                          <ShopContactEdit
                            handleClose={() => setEditTab(undefined)}
                          />
                        )
                      );
                    }}
                  </Modal>
                </>
              </ShopDetailContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.query;
    const { Auth } = withSSRContext(context);

    const shop = await getShopBySlug(slug as string);

    //const isMember = await checkShopMember(shop.id ?? 0, Auth);

    return {
      props: {
        shop: shop
      } // will be passed to the page component as props
    };
  } catch (e) {
    console.error(e);
  }

  return {
    notFound: true
  };
};

export default ShopHome;
