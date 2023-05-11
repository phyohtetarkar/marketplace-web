import ShopManage from "../../../../components/shop/ShopManage";
import { DiscountListing } from "../../../../components/shopdetail";

function Discounts() {
  return (
    <ShopManage activeTab="discounts">
      {(shop) => shop.id && <DiscountListing shopId={shop.id} />}
    </ShopManage>
  );
}

export default Discounts;
