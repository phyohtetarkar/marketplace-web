import { useState } from "react";
import useSWR from "swr";
import { Shop } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import {
  findProducts,
  findShopProducts,
  ProductQuery
} from "../../services/ProductService";
import Alert from "../Alert";
import Loading from "../Loading";
import Pagination from "../Pagination";
import {
  ProductEdit,
  ProductGridItem,
  ProductManageGridItem
} from "../product";

interface ShopProductListingProps {
  shop: Shop;
  isMember: boolean;
  gridClass?: string;
  onProductEdit?: () => void;
}

function ShopProductListing(props: ShopProductListingProps) {
  const {
    shop,
    isMember,
    gridClass = "row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4"
  } = props;

  const [pendingProductId, setPendingProductId] = useState<number>();

  const [query, setQuery] = useState<ProductQuery>({
    "shop-id": props.shop.id
  });

  const { data, error, isLoading, mutate } = useSWR(
    ["/products", query],
    ([url, query]) =>
      props.isMember
        ? findShopProducts(props.shop.id!, query)
        : findProducts(query),
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

    if (!data || data.contents.length === 0) {
      return <Alert message="No products found" />;
    }

    return (
      <>
        <div className={`row ${gridClass} g-3`}>
          {data.contents.map((p, i) => {
            return (
              <div className="col" key={i}>
                {isMember ? (
                  <ProductManageGridItem
                    value={p}
                    onEditClick={() => {
                      setPendingProductId(p.id);
                      props.onProductEdit?.();
                    }}
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

  if (pendingProductId !== undefined) {
    return (
      <ProductEdit
        shop={shop}
        productId={pendingProductId}
        onPopBack={(reload) => {
          setPendingProductId(undefined);
          if (reload) {
            mutate();
          }
        }}
      />
    );
  }

  return (
    <div className="p-0">
      <div className="row g-3 mb-3">
        <div className="col"></div>
        {isMember && (
          <>
            {/* <div className="col-auto">
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
            </div> */}
            <div className="col-auto">
              <button
                className="btn btn-primary px-3 py-2"
                onClick={() => {
                  setPendingProductId(0);
                  props.onProductEdit?.();
                }}
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
