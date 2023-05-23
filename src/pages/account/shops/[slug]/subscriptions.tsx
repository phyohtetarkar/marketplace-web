import { withAuthentication } from "../../../../common/WithAuthentication";
import { ShopManage, ShopSubscription } from "../../../../components/shop";

function Subscriptions() {
  return (
    <ShopManage activeTab="subscriptions">
      {(shop) => shop.id && <ShopSubscription shop={shop} />}
    </ShopManage>
  );
}

export default withAuthentication(Subscriptions);
