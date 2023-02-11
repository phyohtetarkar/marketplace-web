import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { PageData, Shop } from "../../common/models";
import Alert from "../../components/Alert";
import { Input } from "../../components/forms";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import ShopGridItem from "../../components/shop/ShopGridItem";
import { findShops } from "../../services/ShopService";

function Shops() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    ["/shops", router.query],
    ([url, q]) =>
      findShops({ q: q.q as string, page: parseInt(q.page as string) }),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
    }

    if (data?.contents.length === 0) {
      return <Alert message="No shop found" />;
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxxl-4 g-4">
          {data?.contents &&
            data.contents.map((s, i) => {
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
            onChange={(p) => {
              router.push({
                pathname: "",
                query: { ...router.query, page: p }
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
                  <Link href="/">
                    <a className="text-light">Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Shops
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3 justify-content-end mb-3">
          <div className="col-auto">
            <Input
              id="searchinput"
              name="search"
              type="search"
              placeholder="Search shops"
              className="bg-white"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">{content()}</div>
        </div>
      </div>
    </div>
  );
}

export default Shops;
