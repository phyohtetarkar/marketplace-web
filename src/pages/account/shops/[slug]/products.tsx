import ShopManage from "../../../../components/shop/ShopManage";
import { ShopProductListing } from "../../../../components/shopdetail";

function Products() {
  return (
    <ShopManage activeTab="products">
      {(shop) =>
        shop.id && (
          <ShopProductListing
            shopId={shop.id}
            isMember={true}
            gridClass="row-cols-1 row-cols-md-2 row-cols-lg-3"
          />
        )
      }
    </ShopManage>
  );
}

export default Products;
