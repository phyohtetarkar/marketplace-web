import { Input } from "../forms";
import Pagination from "../Pagination";
import { ProductGridItem } from "../product";
import useSWR from "swr";
import { PageData, Product, Shop } from "../../common/models";
import { findAllProducts, ProductQuery } from "../../services/ProductService";
import { useState } from "react";
import Link from "next/link";

function ShopProductListing({
  shop,
  isMember
}: {
  shop: Shop;
  isMember: boolean;
}) {
  const [query, setQuery] = useState<ProductQuery>({ shopId: shop.id });

  const { data, error, isLoading } = useSWR<PageData<Product>, Error>(
    ["/products", query],
    ([url, query]) => findAllProducts(query),
    {
      revalidateOnFocus: false
    }
  );

  return (
    <div className="p-0">
      <div className="row g-3">
        <div className="col-auto ms-auto">
          <Input
            id="searchInput"
            name="search"
            type="text"
            placeholder="Search products"
          />
        </div>
        <div className="col-auto">
          <Link href={`${shop.slug}/create-product`}>
            <a className="btn btn-primary h-100 hstack">Create new</a>
          </Link>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 py-3">
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
