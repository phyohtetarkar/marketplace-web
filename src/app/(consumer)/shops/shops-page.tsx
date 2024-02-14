"use client";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import ShopGridItem from "@/components/shop/ShopGridItem";
import { ShopQuery, findShops } from "@/services/ShopService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties } from "react";
import useSWR from "swr";

function ShopsPage({ query }: { query: ShopQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useSWR(
    ["/shops", query],
    ([url, q]) => (q ? findShops(q) : undefined),
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
      return <Alert message="No shop found" />;
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxxl-4 g-4">
          {data.contents.map((s, i) => {
            return (
              <div className="col" key={i}>
                <ShopGridItem value={s} />
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-end pt-3 px-3">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={(page) => {
              const params = new URLSearchParams(searchParams.toString());

              if (page > 0) {
                params.set("page", page.toString());
              } else {
                params.delete("page");
              }

              router.push("/shops?" + params.toString());
            }}
          />
        </div>
      </>
    );
  };

  return (
    <div className="mb-5">
      <div className="header-bar">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol
                className="breadcrumb mb-1"
                style={
                  {
                    "--bs-breadcrumb-divider-color": "#bbb",
                    "--bs-breadcrumb-item-active-color": "#bbb"
                  } as CSSProperties
                }
              >
                <li className="breadcrumb-item">
                  <Link href="/" className="">
                    Home
                  </Link>
                </li>

                {query?.q ? (
                  <li className="breadcrumb-item active" aria-current="page">
                    Search results for: {`"${query.q}"`}
                  </li>
                ) : (
                  <li className="breadcrumb-item active" aria-current="page">
                    Shops
                  </li>
                )}
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-12">{content()}</div>
        </div>
      </div>
    </div>
  );
}

export default ShopsPage;
