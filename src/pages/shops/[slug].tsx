import {
  CubeIcon,
  InformationCircleIcon,
  MapPinIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { Shop } from "../../common/models";
import Accordion from "../../components/Accordion";
import Rating from "../../components/Rating";
import AboutUs from "../../components/shopdetail/AboutUs";
import ShopBranchListing from "../../components/shopdetail/ShopBranchListing";
import ShopProductListing from "../../components/shopdetail/ShopProductListing";
import ShopReviewListing from "../../components/shopdetail/ShopReviewListing";

type PageTab = "products" | "branches" | "reviews" | "about-us";

function ShopHome({ shop }: { shop: Shop }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PageTab | null>(null);

  const iconSize = 20;

  useEffect(() => {
    if (router.isReady) {
      const array = router.asPath.split("#");
      const tab = array[array.length - 1];
      if (array.length > 1) {
        setActiveTab(tab as PageTab);
      } else {
        setActiveTab("products");
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
        return <ShopProductListing />;
      case "branches":
        return <ShopBranchListing />;
      case "reviews":
        return <ShopReviewListing shopId={shop.id!} />;
      case "about-us":
        return <AboutUs value={shop.about ?? ""} />;
    }

    return null;
  };

  const heading = (
    <>
      <h5 className="mb-0">{shop.name}</h5>
      <div className="text-muted small mb-1 text-truncate">{shop.headline}</div>
    </>
  );

  return (
    <div className="vstack">
      <div className="bg-primary">
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
      <div className="container py-4">
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
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="row p-3 py-sm-4">
                <div className="col">
                  <div className="hstack">
                    <div className="flex-shrink-0 mt-n6">
                      <Image
                        src={shop.logo!}
                        width={100}
                        height={100}
                        alt=""
                        className="rounded border border-4 border-white"
                        objectFit="cover"
                      />
                    </div>
                    <div className="ms-2 flex-column mt-n2 mt-sm-n3 d-none d-md-flex">
                      {heading}
                    </div>
                  </div>
                </div>
                <div className="col-12 d-block d-md-none">
                  <div className="vstack">{heading}</div>
                </div>
                <div className="col-sm-auto">
                  <div className="mt-sm-0 gap-1 hstack" style={{ zIndex: 999 }}>
                    <div className="flex-grow-1 d-none d-md-block"></div>
                    <div className="hstack gap-1">
                      <Rating rating={shop.rating ?? 0} />
                      <span className="text-dark-gray">{shop.rating}</span>
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
            </div>
          </div>
        </div>
        <div className="row py-4 g-4">
          <div className="col-lg-3">
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
          </div>
          <div className="col-lg-9">{activeContent()}</div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.query;
    return {
      props: {
        shop: {
          name: "Mobile Rain",
          logo: "/images/placeholder.jpeg",
          cover: "/images/banner.jpeg",
          headline: "Mobile phones sales & services",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis egestas integer eget aliquet."
        }
      } // will be passed to the page component as props
    };
  } catch (e) {
    console.log(e);
  }

  return {
    notFound: true
  };
};

export default ShopHome;
