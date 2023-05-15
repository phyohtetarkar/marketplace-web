import { withAuthentication } from "../../../../../common/WithAuthentication";
import { ProductEdit } from "../../../../../components/product";
import { ShopManage } from "../../../../../components/shop";

function ProductCreate() {
  return (
    <ShopManage>{(shop) => shop.id && <ProductEdit shop={shop} />}</ShopManage>
  );
}

export default withAuthentication(ProductCreate);
