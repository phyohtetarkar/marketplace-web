import { redirect } from "next/navigation";
import SubscriptionPlanEdit from "../SubscriptionPlanEdit";

export default function UpdateSubscriptionPlan({
  params
}: {
  params: { id: string };
}) {
  var id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/settings/subscription-plans");
  }
  return <SubscriptionPlanEdit id={id} />;
}
