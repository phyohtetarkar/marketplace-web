import { redirect } from "next/navigation";
import CreateProductPage from "./create-product-page";

export default function CreateProduct({
  params
}: {
  params: { shopId: string };
}) {
  var shopId = parseInt(params.shopId);

  if (isNaN(shopId)) {
    redirect(`/profile/shops`);
  }

  return <CreateProductPage shopId={shopId} />;
}
