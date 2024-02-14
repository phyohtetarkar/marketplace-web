import { redirect } from "next/navigation";
import PromoCodeEdit from "../PromoCodeEdit";

export default function UpdatePromoCode({
  params
}: {
  params: { id: string };
}) {
  var id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/settings/promo-codes");
  }
  return <PromoCodeEdit id={id} />;
}
