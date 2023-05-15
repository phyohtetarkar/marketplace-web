import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ShopDetailContext } from "../../../common/contexts";
import { Shop } from "../../../common/models";
import Alert from "../../../components/Alert";
import ProductListing from "../../../components/product/ProductListing";
import {
  AboutUs,
  ShopHeading,
  ShopReviewListing
} from "../../../components/shop";
import Tabs from "../../../components/Tabs";
import { getShopBySlug } from "../../../services/ShopService";

type PageTab = "products" | "reviews" | "about-us";

function ShopHome({ shop }: { shop: Shop | null }) {
  const router = useRouter();

  const { tab } = router.query;

  const [activeTab, setActiveTab] = useState<PageTab | undefined>(
    typeof tab === "string" ? (tab as PageTab) ?? "products" : "products"
  );

  const activeContent = () => {
    if (!shop) {
      return null;
    }
    switch (activeTab) {
      case "products":
        return <ProductListing shopId={shop.id!} />;
      case "reviews":
        return <ShopReviewListing shopId={shop.id!} />;
      case "about-us":
        return <AboutUs />;
    }

    return null;
  };

  if (!shop) {
    return (
      <div className="container py-3">
        <Alert message="Shop not found" />
      </div>
    );
  }

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
                <ShopHeading shop={shop} />
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

    if (shop?.activated && !shop.disabled && !shop.expired) {
      return {
        props: {
          shop: shop
        }
      };
    } else {
      return {
        props: {
          shop: null
        }
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
