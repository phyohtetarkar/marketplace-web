"use client";
import { useShop } from "@/common/hooks";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import ShopContactForm from "./shop-contact-form";
import ShopGeneralForm from "./shop-general-form";
import ShopPaymentForm from "./shop-payment-form";

function SettingPage({ shopId }: { shopId: number }) {
  const { shop, error, isLoading } = useShop(shopId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!shop) {
    return null;
  }

  return (
    <div className="row g-3">
      <div className="col-12">
        <ShopGeneralForm shop={shop} />
      </div>
      <div className="col-12">
        <ShopContactForm shop={shop} />
      </div>
      <div className="col-12">
        <ShopPaymentForm shopId={shopId} />
      </div>
    </div>
  );
}

export default SettingPage;
