import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ShopDetailContext } from "../../../common/contexts";
import { Shop } from "../../../common/models";
import Rating from "../../../components/Rating";
import {
  AboutUs,
  ShopProductListing,
  ShopReviewListing
} from "../../../components/shopdetail";
import Tabs from "../../../components/Tabs";
import { getShopBySlug } from "../../../services/ShopService";

type PageTab = "products" | "reviews" | "about-us";

function ShopHome({ shop }: { shop: Shop }) {
  const router = useRouter();

  const { tab } = router.query;

  const [activeTab, setActiveTab] = useState<PageTab | undefined>(
    typeof tab === "string" ? (tab as PageTab) ?? "products" : "products"
  );

  const activeContent = () => {
    switch (activeTab) {
      case "products":
        return <ShopProductListing shop={shop} isMember={false} />;
      case "reviews":
        return <ShopReviewListing shopId={shop.id!} />;
      case "about-us":
        return <AboutUs />;
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
    <>
      <div className="vstack">
        <div className="header-bar">
          <div className="container">
            <div className="row py-4">
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/" className="">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/shops" className="">
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
              <div className="border rounded bg-white vstack overflow-hidden">
                <div
                  style={{
                    width: "100%",
                    minHeight: 200
                  }}
                  className="position-relative bg-secondary"
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
                    <Tabs.Tab
                      tabKey="about-us"
                      title="About us"
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
                {activeContent()}
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
    //const { Auth } = withSSRContext(context);

    const shop = await getShopBySlug(slug as string);

    //const isMember = await checkShopMember(shop.id ?? 0, Auth);

    if (!shop.disabled) {
      return {
        props: {
          shop: shop
        } // will be passed to the page component as props
      };
    }
  } catch (e) {
    console.error(e);
  }

  return {
    notFound: true
  };
};

export default ShopHome;
