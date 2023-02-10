import { useState } from "react";
import useSWR from "swr";
import { Shop } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import { findProducts, ProductQuery } from "../../services/ProductService";
import Alert from "../Alert";
import { Select } from "../forms";
import Loading from "../Loading";
import Pagination from "../Pagination";
import { ProductGridItem, ProductManageGridItem } from "../product";

interface ShopProductListingProps {
  shop: Shop;
  isMember: boolean;
  onProductEdit?: (slug: string, query: ProductQuery) => void;
  onProductCreate?: (query: ProductQuery) => void;
}

function ShopProductListing(props: ShopProductListingProps) {
  const [query, setQuery] = useState<ProductQuery>({
    "shop-id": props.shop.id,
    status: !props.isMember ? "PUBLISHED" : undefined
  });

  const { data, error, isLoading } = useSWR(
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
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (data?.contents.length === 0) {
      return <Alert message="No products found" />;
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 py-3">
          {data?.contents &&
            data?.contents.map((p, i) => {
              return (
                <div className="col" key={i}>
                  {props.isMember ? (
                    <ProductManageGridItem
                      value={p}
                      onEditClick={() =>
                        p.slug && props.onProductEdit?.(p.slug, query)
                      }
                    />
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
      <div className="row g-3 mb-2">
        <div className="col d-none d-md-block"></div>
        {props.isMember && (
          <>
            <div className="col-auto">
              <Select
                onChange={(evt) => {
                  const status = !evt.target.value
                    ? undefined
                    : evt.target.value;
                  setQuery({ "shop-id": props.shop.id, status: status });
                }}
              >
                <option value="">All Status</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="DENIED">Denied</option>
              </Select>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary h-100 hstack"
                onClick={() => props.onProductCreate?.(query)}
              >
                Create new
              </button>
            </div>
          </>
        )}
        {/* <div className="col-auto">
          <button className="btn btn-outline-primary">
            <AdjustmentsHorizontalIcon width={24} />
          </button>
        </div> */}
      </div>

      {content()}
    </div>
  );
}

export default ShopProductListing;
