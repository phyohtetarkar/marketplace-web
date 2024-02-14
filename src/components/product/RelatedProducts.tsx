"use client";
import useSWR from "swr";
import { parseErrorResponse } from "@/common/utils";
import { getRelatedProducts } from "@/services/ProductService";
import Alert from "../Alert";
import Loading from "../Loading";
import ProductGridItem from "./ProductGridItem";

interface RelatedProductsProps {
  productId: number;
  categoryId?: number;
}

function RelatedProducts(props: RelatedProductsProps) {
  const { productId, categoryId } = props;

  const { data, error, isLoading } = useSWR(
    `/products/${productId}/related`,
    () => getRelatedProducts(productId),
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

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
      {data?.map((p, i) => {
        return (
          <div key={p.id} className="col">
            <ProductGridItem value={p} />
          </div>
        );
      })}
    </div>
  );
}

export default RelatedProducts;
