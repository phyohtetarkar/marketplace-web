import Head from "next/head";
import Link from "next/link";
import { Input, Select } from "../../components/forms";
import Pagination from "../../components/Pagination";
import ShopGridItem from "../../components/shop/ShopGridItem";

function Shops() {
  const list = [1, 2, 3, 4, 5];

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
              type="text"
              placeholder="Search shops"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {list.map((i) => (
                <div className="col" key={i}>
                  <ShopGridItem />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end pt-3 px-3">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shops;
