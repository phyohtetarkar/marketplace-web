import { withAuthentication } from "../../../../../common/WithAuthentication";
import { ShopManage, ShopOrderListing } from "../../../../../components/shop";

function Orders() {
  return (
    <ShopManage activeTab="orders">
      {(shop) => <ShopOrderListing shop={shop} />}
    </ShopManage>
  );
}

export default withAuthentication(Orders);
