"use client";
import { withAuthentication } from "@/common/WithAuthentication";
import { APIError, ForbiddenError } from "@/common/customs";
import { useShop } from "@/common/hooks";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import { ShopHeading } from "@/components/shop";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { CSSProperties, ReactNode, useEffect } from "react";
import ShopMenu from "./ShopMenu";

function MerchantLayoutWrapper({
  shopId,
  children
}: {
  shopId: number;
  children: ReactNode;
}) {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  const { shop, error, isLoading } = useShop(shopId);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (error && error instanceof ForbiddenError) {
      router.replace("/profile/shops");
    }
  }, [error, isLoading, router]);

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      if (error instanceof ForbiddenError) {
        return null;
      }
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!shop) {
      return null;
    }

    if (shop.status === "PENDING") {
      return (
        <Alert
          message={`We are currently reviewing your shop.`}
          variant="info"
        />
      );
    }

    if (shop.status === "DISABLED") {
      return (
        <Alert
          message={"Your shop has been disabled. Please contact to admin."}
          variant="danger"
        />
      );
    }

    const currentTime = new Date().getTime();

    if (
      (shop.expiredAt ?? 0) < currentTime &&
      !segments.find((v) => v === "subscriptions" || v === "renew-subscription")
    ) {
      return (
        <Alert
          message={
            <div>
              No active subscription.
              <Link
                href={`/profile/shops/${shopId}/renew-subscription`}
                className="ms-1 fw-semibold link-anchor"
              >
                Renew subscriptions
              </Link>
              .
            </div>
          }
          variant="warning"
        />
      );
    }

    return (
      <>
        <div className="rounded border overflow-hidden">
          <ShopHeading shop={shop} isMember={true} />
        </div>
        <div className="mb-3"></div>
        <div className="row g-3">
          <div className="col-12 col-lg-3">
            <ShopMenu shop={shop} />
          </div>
          <div className="col-12 col-lg-9">{children}</div>
        </div>
      </>
    );
  };

  return (
    <>
      {shop && <div className="header-bar">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb mb-0"
              style={
                {
                  "--bs-breadcrumb-divider-color": "#bbb",
                  "--bs-breadcrumb-item-active-color": "#bbb"
                } as CSSProperties
              }
            >
              <li className="breadcrumb-item">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/profile/shops">Shops</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {shop.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>}
      <div className="container py-3 mb-5">{content()}</div>
    </>
  );
}

export default withAuthentication(MerchantLayoutWrapper);