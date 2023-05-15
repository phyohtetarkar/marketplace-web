import { withAuthentication } from "../../../../common/WithAuthentication";
import { DiscountListing, ShopManage } from "../../../../components/shop";

function Discounts() {
  return (
    <ShopManage activeTab="discounts">
      {(shop) => shop.id && <DiscountListing shopId={shop.id} />}
    </ShopManage>
  );
}

export default withAuthentication(Discounts);
