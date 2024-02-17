"use client";
import { withAuthorization } from "@/common/withAuthorization";
import Link from "next/link";
import CategoryList from "./CategoryList";
import { useLocalization } from "@/common/hooks";

function CategoriesPage() {
  const { locale } = useLocalization();

  return (
    <>
      <div className="row mb-4 g-3">
        <div className="col-lg-6">
          <h2 className="mb-0">Categories</h2>
        </div>

        <div className="col-lg-6 hstack gap-3">
          <Link
            href="/admin/categories/create-category"
            className="btn btn-primary align-self-center text-nowrap ms-lg-auto"
          >
            Add new
          </Link>
        </div>
      </div>

      <CategoryList categoryId={0} lang={locale} />
    </>
  );
}

export default withAuthorization(CategoriesPage, [
  "CATEGORY_READ",
  "CATEGORY_WRITE"
]);
