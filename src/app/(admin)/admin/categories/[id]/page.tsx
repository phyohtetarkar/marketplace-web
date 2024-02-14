import { redirect } from "next/navigation";
import CategoryEdit from "../CategoryEdit";

export default function UpdateCategory({ params }: { params: { id: string } }) {
  var id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/categories");
  }
  return <CategoryEdit id={id} />;
}
