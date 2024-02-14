import { redirect } from "next/navigation";
import ProductUpdatePage from "./product-update-page";

export default function UpdateProduct({
  params
}: {
  params: { shopId: string; productId: string };
}) {
  var productId = parseInt(params.productId);
  
  if (isNaN(productId)) {
    redirect(`/profile/shops/${params.shopId}`);
  }
  return (
    <ProductUpdatePage
      shopId={parseInt(params.shopId)}
      productId={productId}
    />
  );
}
