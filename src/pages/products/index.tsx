import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import Accordion from "../../components/Accordion";
import Pagination from "../../components/Pagination";
import { ProductGridItem } from "../../components/product";

function Filter() {
  return (
    <div className="rounded border bg-white">
      <Accordion
        open={true}
        header={(open) => {
          return <span className="fw-bold">Filter</span>;
        }}
        headerClassName="px-3 py-2h"
        bodyClassName="border-top"
        iconType="plus-minus"
      >
        <div className="vstack gap-2">
          <div className="p-3 border-bottom">
            <div className="small text-muted mb-3">CATEGORIES</div>
            <div className="vstack gap-2">
              <label>Electronics</label>
              <label>Watches</label>
              <label>Clothes</label>
              <label>Home items</label>
            </div>
          </div>
          <div className="p-3 border-bottom">
            <div className="small text-muted mb-3">BRAND TYPE</div>
            <div className="vstack gap-2">
              <div className="form-check">
                <input
                  id="beginner"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="beginner" className="form-check-label">
                  Samsung
                </label>
              </div>
              <div className="form-check">
                <input
                  id="intermediate"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="intermediate" className="form-check-label">
                  Panasonic
                </label>
              </div>
              <div className="form-check">
                <input
                  id="advance"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="advance" className="form-check-label">
                  Huawei
                </label>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="small text-muted mb-3">SIZE</div>
            <div className="vstack gap-2">
              <div className="form-check">
                <input
                  id="beginner"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="beginner" className="form-check-label">
                  XS
                </label>
              </div>
              <div className="form-check">
                <input
                  id="intermediate"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="intermediate" className="form-check-label">
                  S
                </label>
              </div>
              <div className="form-check">
                <input
                  id="advance"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="advance" className="form-check-label">
                  M
                </label>
              </div>
              <div className="form-check">
                <input
                  id="advance"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="advance" className="form-check-label">
                  L
                </label>
              </div>
              <div className="form-check">
                <input
                  id="advance"
                  type="checkbox"
                  name="level"
                  className="form-check-input"
                />
                <label htmlFor="advance" className="form-check-label">
                  XL
                </label>
              </div>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  );
}

function Explore() {
  function contents() {
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col">
          <ProductGridItem />
        </div>
        <div className="col">
          <ProductGridItem />
        </div>
        <div className="col">
          <ProductGridItem />
        </div>
        <div className="col">
          <ProductGridItem />
        </div>
        <div className="col">
          <ProductGridItem />
        </div>
        <div className="col">
          <ProductGridItem />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <Head>
        <title>All Proudcts</title>
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
                <li className="breadcrumb-item">
                  <Link href="/">
                    <a className="text-light">Sub Category</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Child Category
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-3">
            <Filter />
          </div>
          <div className="col-lg-9 mt-3 mt-lg-0">
            <div className="d-flex mb-3">
              <div className="btn-group ms-auto d-none d-md-block">
                <button className="btn py-2 btn-outline-primary">
                  <ListBulletIcon width={24} />
                </button>
                <button className="btn py-2 btn-primary">
                  <Squares2X2Icon width={24} />
                </button>
              </div>
            </div>
            {contents()}
            <div className="mt-4 d-flex justify-content-end">
              {/* <button className="btn btn-outline-primary rounded-pill">
                Load more products
              </button> */}

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
