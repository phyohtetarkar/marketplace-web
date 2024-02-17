import { redirect } from "next/navigation";
import SettingPage from "./setting-page";

export default async function ShopSetting({
  params
}: {
  params: { shopId: string };
}) {
  const id = parseInt(params.shopId);

  if (isNaN(id)) {
    redirect("/profile/shops");
  }

  return <SettingPage shopId={id} />;
}
