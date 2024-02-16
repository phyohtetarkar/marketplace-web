import SubscriptionsPage from "./subscriptions-page";

export default function ShopSubscriptions({
  params
}: {
  params: { shopId: string };
}) {
  return <SubscriptionsPage shopId={parseInt(params.shopId)} />;
}
