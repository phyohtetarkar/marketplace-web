import {
  Bars3Icon,
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
import { ReactNode, useState } from "react";
import { ShopDetailContext } from "../../../common/contexts";
import { Shop } from "../../../common/models";
import { getAPIBasePath } from "../../../common/utils";
import Dropdown from "../../../components/Dropdown";
import { ShopDashboard, ShopSetting } from "../../../components/merchant";
import { ProductEdit } from "../../../components/product";
import Rating from "../../../components/Rating";
import {
  AboutUs,
  ShopProductListing,
  ShopReviewListing
} from "../../../components/shopdetail";
import Tabs from "../../../components/Tabs";
import { getShopBySlug } from "../../../services/ShopService";

type PageTab =
  | "products"
  | "branches"
  | "reviews"
  | "about-us"
  | "settings"
  | "insights"
  | "orders";

function ShopHome({ shop, isMember }: { shop: Shop; isMember: boolean }) {
  const router = useRouter();

  const { tab } = router.query;

  const [activeTab, setActiveTab] = useState<PageTab | undefined>(
    tab as PageTab
  );

  const [pendingProductId, setPendingProductId] = useState<string>();

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

  // useEffect(() => {
  //   isShopMember(shop.id ?? 0)
  //     .then(setIsMember)
  //     .catch((error) => {
  //       setIsMember(false);
  //     });
  // }, [shop]);

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
      <Link href={href} replace>
        <a
          className={`d-flex align-items-center p-2 my-list-item ${
            active ? "active" : ""
          }`}
          onClick={(e) => {
            active && e.preventDefault();
          }}
        >
          {icon}
          <span>{title}</span>
        </a>
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
      case "reviews":
        return <ShopReviewListing shopId={shop.id!} />;
      case "about-us":
        return <AboutUs value={shop.about ?? ""} />;
      case "settings":
        return <ShopSetting />;
      case "insights":
        return <ShopDashboard />;
      case "orders":
        return null;
    }

    return (
      <ShopProductListing
        shop={shop!}
        isMember={isMember}
        onProductCreate={() => setPendingProductId("new")}
        onProductEdit={(id) => setPendingProductId(id)}
      />
    );
  };

  const heading = (
    <>
      <h5 className="mb-0">{shop.name}</h5>
      <div className="text-muted small mb-1 text-truncate">{shop.headline}</div>
    </>
  );

  if (pendingProductId) {
    return (
      <ProductEdit
        shop={shop}
        productSlug={pendingProductId}
        onPopBack={() => setPendingProductId(undefined)}
      />
    );
  }

  return (
    <div className="vstack">
      <div className="header-bar">
        <div className="container">
          <div className="row py-4">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <a className="text-light">Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/shops">
                    <a className="text-light">Shops</a>
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
                  height: 200
                }}
                className="position-relative"
              >
                <Image
                  src={shop.cover!}
                  alt=""
                  objectFit="cover"
                  layout="fill"
                  priority
                />
                {isMember && (
                  <Dropdown
                    toggle={
                      <Bars3Icon
                        width={24}
                        strokeWidth={1.5}
                        className="text-light"
                      />
                    }
                    className="position-absolute top-0 end-0 m-3"
                    toggleClassName="bg-dark px-2 py-1 border rounded bg-opacity-50"
                    menuClassName="shadow"
                  >
                    <li role={"button"} className="dropdown-item">
                      Upload Logo
                    </li>
                    <li role={"button"} className="dropdown-item">
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
                          src={shop.logo!}
                          width={100}
                          height={100}
                          alt=""
                          className="rounded-1"
                          objectFit="cover"
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
                      <Rating rating={shop.rating ?? 0} />
                      <span className="text-dark-gray">
                        {shop.rating?.toFixed(1)}
                      </span>
                    </div>
                    {/* <a
                      href="#"
                      target="_blank"
                      className="btn btn-outline-light text-muted border"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="btn btn-outline-light text-muted border"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      className="btn btn-outline-light text-muted border"
                    >
                      <Instagram size={18} />
                    </a> */}
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
                  <Tabs.Tab
                    tabKey="insights"
                    title="Insights"
                    tabClassName="text-nowrap"
                    hidden={!isMember}
                  >
                    <div></div>
                  </Tabs.Tab>
                  <Tabs.Tab
                    tabKey="orders"
                    title="Orders"
                    tabClassName="text-nowrap"
                    hidden={!isMember}
                  >
                    <div></div>
                  </Tabs.Tab>
                  <Tabs.Tab
                    tabKey="settings"
                    title="Settings"
                    tabClassName="text-nowrap"
                    hidden={!isMember}
                  >
                    <div></div>
                  </Tabs.Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="row py-4 g-4">
          {/* <div className="col-lg-3">
            <div className="card shadow-sm d-none d-lg-block">
              <div className="card-body">{menus}</div>
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
          </div> */}
          <div className="col-12">
            <ShopDetailContext.Provider value={shop}>
              {activeContent()}
            </ShopDetailContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const { Auth } = withSSRContext(context);
  let isMember = false;

  try {
    const accessToken = (await Auth.currentSession())
      ?.getAccessToken()
      ?.getJwtToken();

    const url = `${getAPIBasePath()}shop-members/check?slug=${slug ?? ""}`;

    if (accessToken) {
      const resp = await fetch(url, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      });

      if (resp.ok) {
        isMember = (await resp.json()) as boolean;
      }
    }
  } catch (error) {}

  try {
    const shop = await getShopBySlug(slug as string);

    return {
      props: {
        shop: shop,
        isMember: isMember
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
