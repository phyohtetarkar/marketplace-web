import { redirect } from "next/navigation";
import SubCategoriesPage from "./sub-categories-page";

export default function SubCategories({ params }: { params: { id: string } }) {
  var id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/categories");
  }
  return <SubCategoriesPage categoryId={id} />;
}
