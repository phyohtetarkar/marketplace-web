import { withAuthentication } from "../../../../common/WithAuthentication";
import { ShopDashboard, ShopManage } from "../../../../components/shop";

function Dashboard() {
  return (
    <ShopManage activeTab="dashboard">
      {(shop) => shop.id && <ShopDashboard shopId={shop.id} />}
    </ShopManage>
  );
}

export default withAuthentication(Dashboard);
