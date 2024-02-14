import DiscountsPage from "./discounts-page";

export default function ShopDiscounts({
  params
}: {
  params: { shopId: string };
}) {
  return <DiscountsPage shopId={parseInt(params.shopId)} />;
}
