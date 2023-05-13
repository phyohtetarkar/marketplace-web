import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "../../common/utils";
import { findShopProducts, ProductQuery } from "../../services/ProductService";
import Alert from "../Alert";
import ConfirmModal from "../ConfirmModal";
import Loading from "../Loading";
import Pagination from "../Pagination";

interface ShopProductListingProps {
  shopId: number;
}

function ShopProductListing(props: ShopProductListingProps) {
  const { shopId } = props;

  const router = useRouter();

  const [pendingProductId, setPendingProductId] = useState<number>();

  const [pendingDeleteId, setPendingDeleteId] = useState<number>();

  const [query, setQuery] = useState<ProductQuery>({
    "shop-id": shopId
  });

  const { data, error, isLoading, mutate } = useSWR(
    ["/products", query],
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
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="text-nowrap">
              <tr>
                <th scope="col" style={{ minWidth: 120 }}>
                  Image
                </th>
                <th scope="col" style={{ minWidth: 250 }}>
                  Name
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  Price
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  Created At
                </th>
                <th scope="col" style={{ minWidth: 150 }}></th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {data?.contents.map((p, i) => {
                return (
                  <tr key={p.id}>
                    <td className="py-2h">
                      <div className="ratio ratio-1x1" style={{ width: 80 }}>
                        <Image
                          src={p.thumbnail ?? "/images/placeholder.jpeg"}
                          className="rounded"
                          fill
                          sizes="33vw"
                          style={{
                            objectFit: "contain"
                          }}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="w-100">
                      <span className="text-wrap">{p.name}</span>
                    </td>
                    <td>{formatNumber(p.price ?? 0)}</td>
                    <td>{formatTimestamp(p.createdAt ?? 0)}</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          router.push(`${router.asPath}/${p.slug}`);
                        }}
                      >
                        <PencilSquareIcon width={20} />
                      </button>
                      <button className="btn btn-danger ms-2">
                        <TrashIcon width={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

  // if (pendingProductId !== undefined) {
  //   return (
  //     <ProductEdit
  //       shopId={shopId}
  //       productId={pendingProductId}
  //       onPopBack={(reload) => {
  //         setPendingProductId(undefined);
  //         if (reload) {
  //           mutate();
  //         }
  //       }}
  //     />
  //   );
  // }

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col"></div>
        <div className="col-auto">
          <button
            className="btn btn-primary px-3 py-2"
            onClick={() => {
              router.push(`${router.asPath}/create`);
            }}
          >
            Create new
          </button>
        </div>
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
    </>
  );
}

export default ShopProductListing;
