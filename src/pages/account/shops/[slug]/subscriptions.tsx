import ShopManage from "../../../../components/shop/ShopManage";
import ShopSubscription from "../../../../components/shop/ShopSubscription";

function Subscriptions() {
  return (
    <ShopManage activeTab="subscriptions">
      {(shop) => shop.id && <ShopSubscription shopId={shop.id} />}
    </ShopManage>
  );
}

export default Subscriptions;
