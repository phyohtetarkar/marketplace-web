import RenewShopSubscription from "./RenewShopSubscription";

export default function RenewSubscription({
  params
}: {
  params: { shopId: string };
}) {
  return <RenewShopSubscription shopId={parseInt(params.shopId)} />;
}
