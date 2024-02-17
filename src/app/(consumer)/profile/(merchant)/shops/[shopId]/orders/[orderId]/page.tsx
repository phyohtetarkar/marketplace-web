import { redirect } from "next/navigation";
import OrderPage from "./order-page";

export default function ShopOrderDetail({
  params
}: {
  params: { shopId: string; orderId: string };
}) {
  var orderId = parseInt(params.orderId);
  if (isNaN(orderId)) {
    redirect(`/profile/shops/${params.shopId}`)
  }
  return (
    <OrderPage
      shopId={parseInt(params.shopId)}
      orderId={orderId}
    />
  );
}
