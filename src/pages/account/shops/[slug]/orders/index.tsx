import ShopManage from "../../../../../components/shop/ShopManage";
import ShopOrderListing from "../../../../../components/shop/ShopOrderListing";

function Orders() {
  return (
    <ShopManage activeTab="orders">
      {(shop) => <ShopOrderListing shop={shop} />}
    </ShopManage>
  );
}

export default Orders;
