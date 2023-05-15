import { withAuthentication } from "../../../../../common/WithAuthentication";
import { ShopManage, ShopProductListing } from "../../../../../components/shop";

function Products() {
  return (
    <ShopManage activeTab="products">
      {(shop) => shop.id && <ShopProductListing shopId={shop.id} />}
    </ShopManage>
  );
}

export default withAuthentication(Products);
