import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { parseErrorResponse } from "../../common/utils";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import ShopGridItem from "../../components/shop/ShopGridItem";
import { findShops, ShopQuery } from "../../services/ShopService";

function Shops() {
  const router = useRouter();

  const firstLoadRef = useRef(false);

  const [query, setQuery] = useState<ShopQuery>();

  const { data, error, isLoading } = useSWR(
    ["/shops", query],
    ([url, q]) => (q ? findShops(q) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (firstLoadRef.current) {
      return;
    }

    firstLoadRef.current = true;

    const { q, page } = router.query;

    setQuery({
      q: typeof q === "string" ? q : undefined,
      page: page && typeof page === "string" ? parseInt(page) : undefined
    });

    return () => {
      firstLoadRef.current = false;
    };
  }, [router]);

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
              const q = { ...router.query };

              if (page > 0) {
                q["page"] = `${page}`;
              } else {
                delete q["page"];
              }

              router.push({
                pathname: "",
                query: q
              });
            }}
          />
        </div>
      </>
    );
  };

  return (
    <div className="mb-5">
      <Head>
        <title>All Shops</title>
      </Head>
      <div className="header-bar">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
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
        {/* <div className="row g-3 justify-content-end mb-3">
          <div className="col-auto">
            <Input
              id="searchinput"
              name="search"
              type="search"
              placeholder="Search shops"
              className="bg-white"
            />
          </div>
        </div> */}
        <div className="row">
          <div className="col-lg-12">{content()}</div>
        </div>
      </div>
    </div>
  );
}

export default Shops;
