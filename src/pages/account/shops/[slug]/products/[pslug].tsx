import { useRouter } from "next/router";
import { withAuthentication } from "../../../../../common/WithAuthentication";
import { ProductEdit } from "../../../../../components/product";
import { ShopManage } from "../../../../../components/shop";

function ProductUpdate() {
  const router = useRouter();

  const { pslug } = router.query;

  const slug = typeof pslug === "string" ? pslug : undefined;

  return (
    <ShopManage>
      {(shop) => shop.id && <ProductEdit shop={shop} slug={slug} />}
    </ShopManage>
  );
}

export default withAuthentication(ProductUpdate);
