"use client";
/* eslint-disable @next/next/no-img-element */
import makeApiRequest from "@/common/makeApiRequest";
import { Discount, PageData, Product } from "@/common/models";
import {
  buildQueryParams,
  debounce,
  formatNumber,
  parseErrorResponse,
  validateResponse
} from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { Input } from "@/components/forms";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

interface ProductQuery {
  q?: string;
  "category-id"?: number;
  "shop-id"?: number;
  featured?: boolean;
  discount?: boolean;
  page?: number;
}

const getProducts = async (query: ProductQuery) => {
  const q = buildQueryParams({ ...query });
  const url = `/admin/products${q}`;
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<Product>>;
};

const updateFeature = async (path: string, productId: number) => {
  const url = `/admin/products/${productId}/${path}`;
  const resp = await makeApiRequest({
    url,
    options: { method: "PUT" },
    authenticated: true
  });

  await validateResponse(resp);
};

const FeaturedCheck = ({
  product,
  mutate
}: {
  product: Product;
  mutate: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <span
        className="spinner-border spinner-border-sm text-light-gray"
        role="status"
      ></span>
    );
  }

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        checked={product.featured ?? false}
        onChange={(evt) => {
          const path = product.featured ? "remove-featured" : "make-featured";
          setLoading(true);
          updateFeature(path, product.id)
            .then(() => mutate())
            .catch((e) => {
              toast.error(parseErrorResponse(e));
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      ></input>
    </div>
  );
};

function ProductsPage() {
  const [query, setQuery] = useState<ProductQuery>({});

  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/products", query],
    ([url, q]) => getProducts(q),
    {
      revalidateOnFocus: false
    }
  );

  const updateInput = debounce((v) => {
    setQuery((old) => {
      return {
        ...old,
        page: undefined,
        q: !v ? undefined : v
      };
    });
  }, 800);

  const discountView = (d?: Discount) => {
    if (d?.type === "PERCENTAGE") {
      return `${d.value} %`;
    }

    if (d?.type === "FIXED_AMOUNT") {
      return formatNumber(d.value ?? 0);
    }

    return "";
  };

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (data?.totalElements === 0) {
      return <Alert message="No products found" variant="info" />;
    }

    return (
      <>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="text-nowrap align-middle">
              <tr>
                <th scope="col" style={{ minWidth: 100 }}>
                  IMAGE
                </th>
                <th scope="col" style={{ minWidth: 300 }}>
                  NAME
                </th>
                <th scope="col" style={{ minWidth: 200 }}>
                  PRICE
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  CATEGORY
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  DISCOUNT
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  FEATURED
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.contents?.map((p, i) => {
                return (
                  <tr key={p.id}>
                    <td className="py-3">
                      <img
                        className="rounded border"
                        src={p.thumbnail ?? "/images/placeholder.jpeg"}
                        alt="Product"
                        style={{ objectFit: "contain" }}
                        width={80}
                        height={80}
                      />
                    </td>
                    <th scope="row">
                      <Link href={`/products/${p.slug}`} className="text-dark">
                        {p.name}
                      </Link>
                    </th>
                    <td>{formatNumber(p.price ?? 0)}</td>
                    <td>{p.category?.name ?? ""}</td>
                    <td className="text-danger">-{discountView(p.discount)}</td>
                    <td>
                      <FeaturedCheck product={p} mutate={mutate} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end pt-4">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={(p) => {
              setQuery((old) => {
                return { ...old, page: p };
              });
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md">
          <h2 className="mb-0">Products</h2>
        </div>

        <div className="col-12 col-md-auto">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div>
              <Input
                id="searchInput"
                name="q"
                type="search"
                placeholder="Search..."
                onChange={(evt) => {
                  var q = evt.target.value;
                  updateInput(q);
                }}
              />
            </div>
            <div className="form-check">
              <input
                id="featuredCheck"
                className="form-check-input"
                type="checkbox"
                checked={query.featured ?? false}
                onChange={(evt) => {
                  setQuery((old) => {
                    return { ...old, featured: evt.target.checked };
                  });
                }}
              ></input>
              <label
                htmlFor="featuredCheck"
                className="form-check-label fw-medium"
              >
                Featured
              </label>
            </div>
            <div className="form-check">
              <input
                id="discountCheck"
                className="form-check-input"
                type="checkbox"
                checked={query.discount ?? false}
                onChange={(evt) => {
                  setQuery((old) => {
                    return { ...old, discount: evt.target.checked };
                  });
                }}
              ></input>
              <label
                htmlFor="discountCheck"
                className="form-check-label fw-medium"
              >
                Discount
              </label>
            </div>
          </div>
        </div>
      </div>
      {content()}
    </>
  );
}

export default withAuthorization(ProductsPage, ["PRODUCT_READ", "PRODUCT_WRITE"]);
