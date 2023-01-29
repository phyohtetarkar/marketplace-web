import { useState } from "react";
import useSWR from "swr";
import { PageData, Product, Shop } from "../../common/models";
import { findProducts, ProductQuery } from "../../services/ProductService";
import { Input } from "../forms";
import Loading from "../Loading";
import Pagination from "../Pagination";
import { ProductGridItem, ProductManageGridItem } from "../product";

interface ShopProductListingProps {
  shop: Shop;
  isMember: boolean;
  onProductEdit?: (id: number) => void;
  onProductCreate?: () => void;
}

function ShopProductListing(props: ShopProductListingProps) {
  const [query, setQuery] = useState<ProductQuery>({
    "shop-id": props.shop.id,
    status: "PUBLISHED"
  });

  const { data, error, isLoading } = useSWR<PageData<Product>, Error>(
    ["/products", query],
    ([url, query]) => findProducts(query),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return null;
    }

    if (data?.contents.length === 0) {
      return (
        <div className="text-muted text-center py-3">No products found</div>
      );
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 py-3">
          {data?.contents &&
            data?.contents.map((p, i) => {
              return (
                <div className="col" key={i}>
                  {props.isMember ? (
                    <ProductManageGridItem value={p} />
                  ) : (
                    <ProductGridItem value={p} />
                  )}
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
  };

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
        {props.isMember && (
          <div className="col-auto">
            <button
              className="btn btn-primary h-100 hstack"
              onClick={() => props.onProductCreate?.()}
            >
              Create new
            </button>
          </div>
        )}
      </div>

      {content()}
    </div>
  );
}

export default ShopProductListing;
