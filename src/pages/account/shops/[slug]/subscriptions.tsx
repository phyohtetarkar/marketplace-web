import { withAuthentication } from "../../../../common/WithAuthentication";
import { ShopManage, ShopSubscription } from "../../../../components/shop";

function Subscriptions() {
  return (
    <ShopManage activeTab="subscriptions">
      {(shop) => shop.id && <ShopSubscription shopId={shop.id} />}
    </ShopManage>
  );
}

export default withAuthentication(Subscriptions);
