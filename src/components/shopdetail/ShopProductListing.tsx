import { Input } from "../forms";
import Pagination from "../Pagination";
import { ProductGridItem } from "../product";
import useSWR from "swr";
import { PageData, Product } from "../../common/models";
import { findAllProducts, ProductQuery } from "../../services/ProductService";
import { useState } from "react";

function ShopProductListing({ shopId }: { shopId: number }) {
  const [query, setQuery] = useState<ProductQuery>({ shopId: shopId });

  const { data, error, isLoading } = useSWR<PageData<Product>, Error>(
    ["/products", query],
    ([url, query]) => findAllProducts(query),
    {
      revalidateOnFocus: false
    }
  );

  return (
    <div className="p-0">
      <div className="row">
        <div className="col-auto ms-auto">
          <Input
            id="searchInput"
            name="search"
            type="text"
            placeholder="Search your products"
          />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-3">
        {data?.contents &&
          data?.contents.map((p, i) => {
            return (
              <div className="col" key={i}>
                <ProductGridItem value={p} />
              </div>
            );
          })}
      </div>

      <div className="d-flex justify-content-end pt-3">
        <Pagination
          currentPage={data?.currentPage}
          totalPage={data?.totalPage}
        />
      </div>
    </div>
  );
}

export default ShopProductListing;
