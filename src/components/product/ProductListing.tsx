import { useState } from "react";
import useSWR from "swr";
import { parseErrorResponse } from "../../common/utils";
import {
  findProducts,
  findShopProducts,
  ProductQuery
} from "../../services/ProductService";
import Alert from "../Alert";
import Loading from "../Loading";
import Pagination from "../Pagination";
import ProductGridItem from "./ProductGridItem";

interface ProductListingProps {
  shopId: number;
}

function ProductListing(props: ProductListingProps) {
  const { shopId } = props;

  const [query, setQuery] = useState<ProductQuery>({
    "shop-id": shopId
  });

  const { data, error, isLoading, mutate } = useSWR(
    ["/products", query],
    ([url, query]) => findProducts(query),
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
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        {data.contents.map((p, i) => {
          return (
            <div key={p.id} className="col">
              <ProductGridItem value={p} />
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-end pt-3">
        <Pagination
          currentPage={data?.currentPage}
          totalPage={data?.totalPage}
          onChange={(p) => {
            setQuery((old) => ({ ...old, page: p }));
          }}
        />
      </div>
    </>
  );
}

export default ProductListing;
