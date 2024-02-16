import { redirect } from "next/navigation";
import ShopPage from "./shop-page";

export default function Shop({ params }: { params: { id: string } }) {
  var id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/shops");
  }

  return <ShopPage shopId={id} />;
}
