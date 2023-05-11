import ShopManage from "../../../../components/shop/ShopManage";
import { ShopDashboard } from "../../../../components/shopdetail";

function Dashboard() {
  return (
    <ShopManage activeTab="dashboard">
      {(shop) => shop.id && <ShopDashboard shopId={shop.id} />}
    </ShopManage>
  );
}

export default Dashboard;
