import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Discount, Product, ProductStatus } from "../../common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse,
  transformDiscount
} from "../../common/utils";
import {
  deleteProduct,
  findShopProducts,
  ProductQuery
} from "../../services/ProductService";
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

  const statusView = (p?: ProductStatus) => {
    switch (p) {
      case "PUBLISHED":
        return (
          <small className="rounded bg-success text-light px-2 py-1">
            PUBLISHED
          </small>
        );
      case "DRAFT":
        return <small className="rounded bg-default px-2 py-1">DRAFT</small>;
    }

    return null;
  };

  const discountView = (d?: Discount) => {
    if (d?.type === "PERCENTAGE") {
      return `${d.value} %`;
    }

    if (d?.type === "FIXED_AMOUNT") {
      return formatNumber(d.value ?? 0);
    }

    return "";
  };

  const priceView = (p: Product) => {
    if (p.discount) {
      return (
        <div className="vstack">
          <span>{formatNumber(p.price ?? 0)}</span>
          <span className="text-danger">(-{discountView(p.discount)})</span>
        </div>
      );
    }

    return formatNumber(p.price ?? 0);
  };

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
                  IMAGE
                </th>
                <th scope="col" style={{ minWidth: 250 }}>
                  PRODUCT
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  PRICE
                </th>
                {/* <th scope="col" style={{ minWidth: 150 }}>
                  DISCOUNT
                </th> */}
                <th scope="col" style={{ minWidth: 100 }}>
                  STATUS
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  CREATED AT
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  ACTION
                </th>
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
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-wrap text-dark"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td>{priceView(p)}</td>
                    {/* <td className="text-danger">-{discountView(p.discount)}</td> */}
                    <td>{statusView(p.status)}</td>
                    <td>{formatTimestamp(p.createdAt ?? 0)}</td>
                    <td>
                      <button
                        className="btn btn-default"
                        onClick={() => {
                          router.push(`${router.asPath}/${p.slug}`);
                        }}
                      >
                        <PencilSquareIcon width={20} />
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          setPendingDeleteId(p.id);
                        }}
                      >
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
            if (!pendingDeleteId) {
              throw undefined;
            }
            await deleteProduct(pendingDeleteId);
            setPendingDeleteId(undefined);
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

export default ShopProductListing;
