"use client";
import { useLocalization } from "@/common/hooks";
import { getCategoryName, parseErrorResponse } from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import { getCategoryById } from "@/services/CategoryService";
import Link from "next/link";
import useSWR from "swr";
import CategoryList from "../../CategoryList";

function SubCategoriesPage({ categoryId }: { categoryId: number }) {
  const { locale } = useLocalization();

  const { data, error, isLoading } = useSWR(
    `/admin/categories/${categoryId}`,
    () => getCategoryById(categoryId),
    {
      revalidateOnFocus: false
    }
  );

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!data) {
    return null;
  }

  const breadcrumb = () => {
    const element: JSX.Element[] = [];
    element.push(
      <li key={data.id} className="breadcrumb-item active" aria-current="page">
        {getCategoryName(locale, data)}
      </li>
    );

    for (let c = data?.category; !!c; c = c?.category) {
      const e = (
        <li key={c.id} className="breadcrumb-item">
          <Link href={`/admin/categories/${c.id}/list`}>
            {getCategoryName(locale, c)}
          </Link>
        </li>
      );
      element.push(e);
    }

    const e = (
      <li key={"root"} className="breadcrumb-item">
        <Link href={`/admin/categories`}>
          Root
        </Link>
      </li>
    );
    element.push(e);

    return element.reverse();
  };

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-lg-6">
          <h3 className="fw-semibold mb-0">Sub Categories</h3>
          <nav aria-label="breadcrumb col-12">
            <ol className="breadcrumb mb-1">{breadcrumb()}</ol>
          </nav>
        </div>

        <div className="col-lg-6 hstack gap-3">
          <Link
            href={`/admin/categories/create-category`}
            className="btn btn-primary align-self-center text-nowrap ms-lg-auto"
          >
            Add new
          </Link>
        </div>
      </div>

      <CategoryList categoryId={categoryId} lang={locale} />
    </>
  );
}

export default withAuthorization(SubCategoriesPage, [
  "CATEGORY_READ",
  "CATEGORY_WRITE"
]);
