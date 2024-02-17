"use client";
import { withAuthentication } from "@/common/WithAuthentication";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { ProductFavoriteItem } from "@/components/product";
import { getFavoriteProducts } from "@/services/FavoriteProductService";
import { useState } from "react";
import useSWR from "swr";

function FavoritesPage() {
  const [page, setPage] = useState(0);

  const { data, error, isLoading } = useSWR(
    ["/favorite-products", page],
    ([url, p]) => getFavoriteProducts(p),
    {
      revalidateOnFocus: false
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (data?.contents.length === 0) {
    return <Alert message="No favorites found" />;
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {data?.contents &&
          data.contents.map((p, i) => {
            return (
              <div className="col" key={p.id}>
                <ProductFavoriteItem product={p} />
              </div>
            );
          })}
      </div>
      <div className="float-end mt-3">
        <Pagination
          currentPage={data?.currentPage}
          totalPage={data?.totalPage}
          onChange={setPage}
        />
      </div>
    </>
  );

  // return (
  //   <div className="container py-3 mb-5">
  //     <div className="row g-3">
  //       <div className="col-lg-4 col-xl-3">
  //         <ProfileMenu />
  //       </div>
  //       <div className="col-lg-8 col-xl-9">{content()}</div>
  //     </div>
  //   </div>
  // );
}

export default withAuthentication(FavoritesPage);
