import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { parseErrorResponse } from "../../common/utils";
import {
  findProducts,
  findShopProducts,
  ProductQuery
} from "../../services/ProductService";
import Alert from "../Alert";
import ConfirmModal from "../ConfirmModal";
import Loading from "../Loading";
import Pagination from "../Pagination";
import {
  ProductEdit,
  ProductGridItem,
  ProductManageGridItem
} from "../product";

interface ShopProductListingProps {
  shopId: number;
  isMember: boolean;
  gridClass?: string;
}

function ShopProductListing(props: ShopProductListingProps) {
  const {
    shopId,
    isMember,
    gridClass = "row row-cols-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4"
  } = props;

  const [pendingProductId, setPendingProductId] = useState<number>();

  const [pendingDeleteId, setPendingDeleteId] = useState<number>();

  const [query, setQuery] = useState<ProductQuery>({
    "shop-id": shopId
  });

  const { data, error, isLoading, mutate } = useSWR(
    ["/products", query],
    ([url, query]) =>
      props.isMember ? findShopProducts(shopId, query) : findProducts(query),
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
                    }}
                    onDeleteClick={() => {
                      setPendingDeleteId(p.id);
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
        shopId={shopId}
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
            <div className="col-auto">
              <button
                className="btn btn-primary px-3 py-2"
                onClick={() => {
                  setPendingProductId(0);
                }}
              >
                Create new
              </button>
            </div>
          </>
        )}
      </div>

      {content()}

      <ConfirmModal
        message="Are you sure to delete?"
        show={!!pendingDeleteId}
        close={() => setPendingDeleteId(undefined)}
        onConfirm={async () => {
          try {
            setPendingDeleteId(undefined);
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />
    </div>
  );
}

export default ShopProductListing;
