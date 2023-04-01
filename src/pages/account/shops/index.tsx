import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { withAuthentication } from "../../../common/WithAuthentication";
import AccountMenu from "../../../components/account/AccountMenu";
import Alert from "../../../components/Alert";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { ShopManageGridItem } from "../../../components/shop";
import { getMyShops } from "../../../services/ShopService";

function MyShops() {
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
    <div>
      {/* <div className="header-bar">
        <div className="container">
          <div className="py-4">
            <h1 className="text-center text-lg-start mb-0">My Shops</h1>
          </div>
        </div>
      </div> */}

      <div className="container py-3 mb-5">
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="row g-3 mb-3">
              <div className="col"></div>
              <div className="col-auto">
                <Link
                  href="/account/shops/create"
                  className="ms-auto btn btn-primary h-100 hstack py-2"
                >
                  Create new
                </Link>
              </div>
            </div>
            <div>{content()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(MyShops);
