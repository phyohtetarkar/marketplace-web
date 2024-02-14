"use client";

import { Shop } from "@/common/models";
import Alert from "@/components/Alert";
import Tabs from "@/components/Tabs";
import ProductListing from "@/components/product/ProductListing";
import { AboutUs, ShopHeading, ShopReviewListing } from "@/components/shop";
import Link from "next/link";
import { CSSProperties, useState } from "react";

type PageTab = "products" | "reviews" | "about-us";

function ShopPage({ shop }: { shop: Shop | null }) {
  const [activeTab, setActiveTab] = useState<PageTab | undefined>();

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
        return <AboutUs shop={shop} />;
    }

    return <ProductListing shopId={shop.id!} />;
  };

  if (!shop) {
    return (
      <div className="container py-3">
        <Alert message="Shop not found" />
      </div>
    );
  }

  return (
    <div className="vstack">
      <div className="header-bar">
        <div className="container">
          <div className="row py-4">
            <nav aria-label="breadcrumb col-12">
              <ol
                className="breadcrumb mb-1"
                style={
                  {
                    "--bs-breadcrumb-divider-color": "#bbb",
                    "--bs-breadcrumb-item-active-color": "#bbb"
                  } as CSSProperties
                }
              >
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
          <div className="col-12">{activeContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
