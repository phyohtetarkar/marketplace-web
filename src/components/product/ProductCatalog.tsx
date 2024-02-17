"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { parseErrorResponse } from "@/common/utils";
import { ProductQuery, findProducts } from "@/services/ProductService";
import Alert from "../Alert";
import Loading from "../Loading";
import Pagination from "../Pagination";
import ProductGridItem from "./ProductGridItem";

interface ProductCatalogProps {
  basePath: string;
  query: ProductQuery;
  gridCount?: number;
}

function ProductCatalog(props: ProductCatalogProps) {
  const { basePath, query, gridCount = 3 } = props;

  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useSWR(
    ["/products", query],
    ([url, q]) => (q ? findProducts(q) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!data || data.contents.length === 0) {
    return <Alert message="No products found" />;
  }

  return (
    <>
      <div className={`row row-cols-1 row-cols-sm-2 row-cols-lg-${gridCount} g-3`}>
        {data.contents.map((p, i) => {
          return (
            <div className="col" key={p.id}>
              <ProductGridItem value={p} />
            </div>
          );
        })}
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <Pagination
          currentPage={data.currentPage}
          totalPage={data.totalPage}
          onChange={(page) => {
            const params = new URLSearchParams(searchParams.toString());

            if (page > 0) {
              params.set("page", page.toString());
            } else {
              params.delete("page");
            }

            router.push(basePath + "?" + params.toString());
          }}
        />
      </div>
    </>
  );
}

export default ProductCatalog;
