import { ProductEdit } from "../../../../../components/product";
import ShopManage from "../../../../../components/shop/ShopManage";

function ProductCreate() {
  return (
    <ShopManage>{(shop) => shop.id && <ProductEdit shop={shop} />}</ShopManage>
  );
}

export default ProductCreate;
