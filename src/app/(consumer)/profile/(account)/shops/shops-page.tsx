"use client";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { ShopManageGridItem } from "@/components/shop";
import { getMyShops } from "@/services/ShopService";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

function ShopsPage() {
  const [page, setPage] = useState(0);

  const { data, error, isLoading, isValidating } = useSWR(
    ["/my-shops", page],
    ([url, p]) => getMyShops(p),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading || isValidating) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (data?.contents.length === 0) {
      return <Alert message="No shops found" />;
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
          {data?.contents &&
            data.contents.map((s, i) => {
              return (
                <div className="col" key={s.id}>
                  <ShopManageGridItem value={s} />
                </div>
              );
            })}
        </div>

        <div className="d-flex justify-content-end pt-3">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={setPage}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-auto">
          <Link
            href="/create-shop"
            className="ms-auto btn btn-primary h-100 hstack py-2"
          >
            Create shop
          </Link>
        </div>
      </div>
      <div>{content()}</div>
    </>
  );
}

export default ShopsPage;
