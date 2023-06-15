import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Category } from "../../common/models";
import { parseErrorResponse } from "../../common/utils";
import { getBrandsByCategory } from "../../services/CategoryService";
import {
  findProducts,
  getProductBrandsByNameLike,
  ProductQuery
} from "../../services/ProductService";
import Accordion from "../Accordion";
import Alert from "../Alert";
import Loading from "../Loading";
import Pagination from "../Pagination";
import ProductGridItem from "./ProductGridItem";

interface ProductCatalogProps {
  basePath: string;
  category?: Category;
  query: ProductQuery;
}

interface FilterProps {
  basePath: string;
  q?: string;
  categoryId?: number;
}

const Filter = (props: FilterProps) => {
  const { basePath, q, categoryId } = props;
  const router = useRouter();

  const { brand } = router.query;

  const [maxPrice, setMaxPrice] = useState(10000000);

  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    if (categoryId) {
      getBrandsByCategory(categoryId).then(setBrands).catch(console.error);
    } else if (q) {
      getProductBrandsByNameLike(q).then(setBrands).catch(console.error);
    }
  }, [categoryId, q]);

  const isChecked = (b: string) => {
    if (!brand) {
      return false;
    }

    if (typeof brand === "string") {
      return brand === b;
    } else if (brand instanceof Array) {
      return brand.includes(b);
    }

    return false;
  };

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
          {/* <div className="p-3 border-bottom">
              <div className="small text-muted mb-3">CATEGORIES</div>
              <div className="vstack gap-2">
                <label>Electronics</label>
                <label>Watches</label>
                <label>Clothes</label>
                <label>Home items</label>
              </div>
            </div> */}
          <div className="p-3 border-bottom">
            <div className="small text-muted mb-3">BRANDS</div>
            <div
              className="scrollbar-custom py-1"
              style={{ overflowY: "auto", overflowX: "hidden" }}
            >
              <div
                className="vstack gap-2"
                style={{ maxHeight: 250, minHeight: 100 }}
              >
                {brands.map((b, i) => {
                  return (
                    <div key={i} className="form-check">
                      <input
                        id={`brand${i}`}
                        type="checkbox"
                        name="brand"
                        className="form-check-input shadow-none"
                        checked={isChecked(b)}
                        onChange={(evt) => {
                          let brands = new Set<string>();
                          const q = { ...router.query };

                          if (typeof q.brand === "string") {
                            brands.add(q.brand);
                          } else if (typeof q.brand === "object") {
                            brands = new Set(...q.brand);
                          }

                          if (evt.target.checked) {
                            brands.add(b);
                          } else {
                            brands.delete(b);
                          }

                          q.brand = Array.from(brands);
                          if (q.page) {
                            delete q.page;
                          }

                          router.push({
                            pathname: basePath,
                            query: q
                          });
                        }}
                      />
                      <label htmlFor={`brand${i}`} className="form-check-label">
                        {b}
                      </label>
                    </div>
                  );
                })}
                <div className="invisible p-1"></div>
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
                min={0}
                max={10000000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              ></input>
              <div className="hstack">
                <div>0Ks</div>
                <div className="flex-grow-1"></div>
                <div>{maxPrice}Ks</div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <button
              className="btn btn-primary w-100 py-2"
              onClick={() => {
                const q = { ...router.query, maxPrice: maxPrice };

                router.push({
                  pathname: basePath,
                  query: q
                });
              }}
            >
              Apply filter
            </button>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

function ProductCatalog(props: ProductCatalogProps) {
  const { basePath, category, query } = props;

  const router = useRouter();

  const { maxPrice } = router.query;

  const { data, error, isLoading } = useSWR(
    ["/products", query],
    ([url, q]) => (q ? findProducts(q) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  const breadcrumb = () => {
    if (!category) {
      return (
        <>
          <li className="breadcrumb-item">
            <Link href={`/`} className="">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Search results for: {`"${query.q}"`}
          </li>
        </>
      );
    }

    const element: JSX.Element[] = [];

    element.push(
      <li
        key={category.id}
        className="breadcrumb-item active"
        aria-current="page"
      >
        {category.name}
      </li>
    );

    for (let c = category?.category; !!c; c = c?.category) {
      const e = (
        <li key={c.id} className="breadcrumb-item">
          <Link href={`/collections/${c.slug}`} className="">
            {c.name}
          </Link>
        </li>
      );
      element.push(e);
    }

    return element.reverse();
  };

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data || data.contents.length === 0) {
      return <Alert message="No products found" />;
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          {data.contents.map((p, i) => {
            return (
              <div className="col" key={p.id}>
                <ProductGridItem value={p} />
              </div>
            );
          })}
        </div>
        <div className="mt-4 d-flex justify-content-end">
          {/* <button className="btn btn-outline-primary rounded-pill">
                    Load more products
                  </button> */}

          <Pagination
            currentPage={data.currentPage}
            totalPage={data.totalPage}
            onChange={(page) => {
              const q = { ...router.query };

              if (page > 0) {
                q["page"] = `${page}`;
              } else {
                delete q["page"];
              }

              router.push({
                pathname: basePath,
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
        <title>All Proudcts</title>
      </Head>
      <div className="header-bar">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">{breadcrumb()}</ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <Filter basePath={basePath} categoryId={category?.id} q={query.q} />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="d-flex flex-wrap gap-2">
              {/* <div className="btn-group ms-auto d-none d-md-block">
                <button className="btn py-2 btn-outline-primary">
                  <ListBulletIcon width={24} />
                </button>
                <button className="btn py-2 btn-primary">
                  <Squares2X2Icon width={24} />
                </button>
              </div> */}
            </div>
            {content()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCatalog;
