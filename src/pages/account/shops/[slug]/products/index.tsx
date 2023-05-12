import ShopManage from "../../../../../components/shop/ShopManage";
import { ShopProductListing } from "../../../../../components/shopdetail";

function Products() {
  return (
    <ShopManage activeTab="products">
      {(shop) => shop.id && <ShopProductListing shopId={shop.id} />}
    </ShopManage>
  );
}

export default Products;
