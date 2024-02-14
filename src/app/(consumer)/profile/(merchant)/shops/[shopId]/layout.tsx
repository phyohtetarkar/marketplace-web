import { redirect } from "next/navigation";
import { ReactNode } from "react";
import MerchantLayoutWrapper from "./MerchantLayoutWrapper";

export default function MerchantLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { shopId: string };
}) {
  var shopId = parseInt(params.shopId);

  if (isNaN(shopId)) {
    redirect("/profile/shops");
  }

  return (
    <MerchantLayoutWrapper shopId={shopId}>
      {children}
    </MerchantLayoutWrapper>
  );
}
