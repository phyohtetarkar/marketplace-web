import { redirect } from "next/navigation";
import BannerEdit from "../BannerEdit";

export default function UpdateBanner({ params }: { params: { id: string } }) {
  var id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/banners");
  }

  return <BannerEdit id={id} />;
}
