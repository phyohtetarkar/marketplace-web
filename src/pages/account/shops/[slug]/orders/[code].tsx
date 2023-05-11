import ShopManage from "../../../../../components/shop/ShopManage";
import ShopOrderDetail from "../../../../../components/shop/ShopOrderDetail";

function OrderDetail() {
  return <ShopManage>{(shop) => <ShopOrderDetail shop={shop} />}</ShopManage>;
}

export default OrderDetail;
