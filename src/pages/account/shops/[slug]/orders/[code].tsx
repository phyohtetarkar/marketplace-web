import { withAuthentication } from "../../../../../common/WithAuthentication";
import { ShopManage, ShopOrderDetail } from "../../../../../components/shop";

function OrderDetail() {
  return (
    <ShopManage customBody>
      {(shop) => <ShopOrderDetail shop={shop} />}
    </ShopManage>
  );
}

export default withAuthentication(OrderDetail);
