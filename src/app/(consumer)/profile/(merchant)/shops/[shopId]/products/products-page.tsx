"use client";
import { ProductStatus } from "@/common/models";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { Select } from "@/components/forms";
import { ProductManageGridItem } from "@/components/product";
import {
  ProductQuery,
  deleteProduct,
  findShopProducts
} from "@/services/ProductService";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

interface ShopProductListingProps {
  shopId: number;
}

function ProductsPage(props: ShopProductListingProps) {
  const { shopId } = props;

  const [deleteId, setDeletedId] = useState<number>();
  const [query, setQuery] = useState<ProductQuery>({
    "shop-id": shopId
  });

  const { data, error, isLoading, mutate } = useSWR(
    ["/shop-products", query],
    ([url, query]) => findShopProducts(shopId, query),
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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {data.contents.map((p, i) => {
            return (
              <div key={p.id} className="col">
                <ProductManageGridItem
                  shopId={shopId}
                  value={p}
                  onDeleteClick={() => setDeletedId(p.id)}
                />
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-end">
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
    <>
      <div className="row g-3 mb-4">
        <div className="col hstack">
          <div>
            <Select
              value={query.status}
              height={44}
              onChange={(evt) => {
                setQuery((old) => {
                  return {
                    ...old,
                    status: !evt.target.value
                      ? undefined
                      : (evt.target.value as ProductStatus)
                  };
                });
              }}
            >
              <option value={""}>All Status</option>
              <option value={"PUBLISHED"}>Published</option>
              <option value={"DRAFT"}>Draft</option>
            </Select>
          </div>
        </div>
        <div className="col-auto hstack">
          <Link
            href={`/profile/shops/${shopId}/products/create-product`}
            className="btn btn-primary px-3 py-2"
          >
            Create new
          </Link>
        </div>
      </div>

      {content()}

      <ConfirmModal
        message="Are you sure to delete?"
        show={!!deleteId}
        close={() => setDeletedId(undefined)}
        onConfirm={async () => {
          try {
            if (!deleteId) {
              throw undefined;
            }
            await deleteProduct(shopId, deleteId);
            setDeletedId(undefined);
            mutate();
            toast.success("Product deleted successfully");
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />
    </>
  );
}

export default ProductsPage;
