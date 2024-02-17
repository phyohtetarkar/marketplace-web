import ShopDashboard from "./dashboard-page";

export default function Dashboard({
  params
}: {
  params: { shopId: string };
}) {
  return <ShopDashboard shopId={parseInt(params.shopId)} />;
}
