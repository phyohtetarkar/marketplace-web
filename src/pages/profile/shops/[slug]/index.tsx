import {
  ChartBarIcon,
  Cog6ToothIcon,
  CubeIcon,
  InboxArrowDownIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { withAuthentication } from "../../../../common/WithAuthentication";
import Accordion from "../../../../components/Accordion";
import Dropdown from "../../../../components/Dropdown";
import ManageDiscounts from "../../../../components/merchant/ManageDiscounts";
import ManageProducts from "../../../../components/merchant/ManageProducts";
import ShopDashboard from "../../../../components/merchant/ShopDashboard";
import ShopSetting from "../../../../components/merchant/ShopSetting";
import { Shop } from "../../../../common/models";
import { getShopBySlug } from "../../../../services/ShopService";
import Loading from "../../../../components/Loading";
import { ShopDetailContext } from "../../../../common/contexts";

type PageTab = "dashboard" | "products" | "discounts" | "orders" | "setting";

const iconSize = 20;

function MyShopDetail() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PageTab | null>(null);

  const { slug } = router.query;

  const { data, error, isLoading, isValidating } = useSWR<Shop, Error>(
    ["/shops", slug],
    ([url, s]) => getShopBySlug(s),
    {
      revalidateOnFocus: false
    }
  );

  // const image = useMemo(() => {
  //   return `https://source.unsplash.com/random/200x240?random=${Math.floor(
  //     Math.random() * 50
  //   )}`;
  // }, []);

  useEffect(() => {
    if (router.isReady) {
      const array = router.asPath.split("#");
      const tab = array[array.length - 1];
      if (array.length > 1) {
        setActiveTab(tab as PageTab);
      } else {
        setActiveTab("dashboard");
      }
    }
  }, [router]);

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
          href: `/profile/shops/${data?.slug}#dashboard`,
          title: "Dashboard",
          active: activeTab === "dashboard",
          icon: (
            <ChartBarIcon className="me-2" strokeWidth={2} width={iconSize} />
          )
        })}
        {menuLink({
          href: `/profile/shops/${data?.slug}#products`,
          title: "Products",
          active: activeTab === "products",
          icon: <CubeIcon className="me-2" strokeWidth={2} width={iconSize} />
        })}
        {menuLink({
          href: `/profile/shops/${data?.slug}#discounts`,
          title: "Discounts",
          active: activeTab === "discounts",
          icon: <TagIcon className="me-2" strokeWidth={2} width={iconSize} />
        })}
        {menuLink({
          href: `/profile/shops/${data?.slug}#orders`,
          title: "Orders",
          active: activeTab === "orders",
          icon: (
            <InboxArrowDownIcon
              className="me-2"
              strokeWidth={2}
              width={iconSize}
            />
          )
        })}
        {menuLink({
          href: `/profile/shops/${data?.slug}#setting`,
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
    switch (activeTab) {
      case "dashboard":
        return <ShopDashboard />;
      case "products":
        return <ManageProducts shopId={data?.id!} />;
      case "discounts":
        return <ManageDiscounts shopId={data?.id!} />;
      case "setting":
        return <ShopSetting />;
    }

    return null;
  };

  const heading = (
    <>
      <h5 className="mb-0">{data?.name}</h5>
      <div className="text-muted small mb-1 text-truncate">
        {data?.headline}
      </div>
    </>
  );

  if (isLoading || isValidating) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return (
    <div>
      <div className="bg-primary">
        <div className="container py-4">
          <div>
            <h3 className="text-light text-lg-start">Shop Overview</h3>
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href="/profile/shops">
                    <a href="#" className="text-light">
                      Shops
                    </a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {data?.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <div className="bg-white vstack shadow-sm rounded">
              <div
                style={{
                  width: "100%",
                  height: 200
                }}
                className="position-relative"
              >
                <Image
                  src={data?.cover ?? "/images/placeholder.jpeg"}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-top"
                  priority
                />
              </div>
              <div className="row p-3 py-sm-4 position-relative">
                <div className="col">
                  <div className="hstack flex-wrap gap-2">
                    <div className="flex-shrink-0 mt-n9">
                      <div className="bg-white p-1 pb-0 rounded">
                        <Image
                          src={data?.logo ?? "/images/placeholder.jpeg"}
                          width={100}
                          height={100}
                          alt=""
                          className="rounded-1"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <div className="ms-2 d-flex flex-column mt-n2 mt-sm-n3 d-none d-md-flex">
                      {heading}
                    </div>
                  </div>
                </div>
                <div className="col-12 d-block d-md-none mb-2h">
                  <div className="vstack">{heading}</div>
                </div>
                <div className="col-sm-auto">
                  <div className="mt-sm-0 gap-1 hstack" style={{ zIndex: 999 }}>
                    <div className="flex-grow-1 d-none d-md-block"></div>
                    <Dropdown
                      toggle={
                        <button className="btn btn-outline-light text-muted dropdown-toggle border">
                          Shop Action
                        </button>
                      }
                      menuClassName="dropdown-menu-start dropdown-menu-md-end"
                    >
                      <li
                        role="button"
                        className="dropdown-item"
                        onClick={() => {
                          router.push(`/shops/${data?.slug}`);
                        }}
                      >
                        View public
                      </li>
                      <li
                        role="button"
                        className="dropdown-item"
                        onClick={() => {
                          router.replace("/profile/shops/1#products");
                        }}
                      >
                        Delete
                      </li>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row py-4 g-4">
          <div className="col-lg-3">
            <>
              <div className="card d-none d-lg-block shadow-sm">
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
            </>
          </div>
          <div className="col-lg-9">
            <ShopDetailContext.Provider value={data}>
              {activeContent()}
            </ShopDetailContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(MyShopDetail);
