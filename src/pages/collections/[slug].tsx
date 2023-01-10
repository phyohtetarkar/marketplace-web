import useSWR from "swr";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Accordion from "../../components/Accordion";
import Pagination from "../../components/Pagination";
import { ProductGridItem } from "../../components/product";
import { PageData, Product } from "../../common/models";
import { findAllProducts } from "../../services/ProductService";

const Filter = () => {
  const [maxPrice, setMaxPrice] = useState(300000);
  return (
    <div className="rounded shadow-sm bg-white">
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
            <div className="small text-muted mb-3">BRANDS</div>
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

          <div className="p-3 border-bottom">
            <div className="small text-muted mb-3">PRICE RANGE</div>
            <div className="vstack">
              <input
                type="range"
                className="form-range"
                id="priceRange"
                step={1000}
                min={10000}
                max={300000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              ></input>
              <div className="hstack">
                <div>10000Ks</div>
                <div className="flex-grow-1"></div>
                <div>{maxPrice}Ks</div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <button className="btn btn-primary w-100 py-2">Apply filter</button>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

function Collection() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error, isLoading } = useSWR<PageData<Product>, Error>(
    ["/products"],
    ([url]) => findAllProducts({}),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
    }

    if (error) {
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
          {data?.contents &&
            data.contents.map((s, i) => {
              return (
                <div className="col" key={s.id}>
                  <ProductGridItem value={s} />
                </div>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <div className="mb-5">
      <Head>
        <title>All Proudcts</title>
      </Head>
      <div className="header-bar mb-3">
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
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <Filter />
          </div>
          <div className="col-lg-8 col-xl-9 mt-3 mt-lg-0">
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
            {content()}
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

export default Collection;
