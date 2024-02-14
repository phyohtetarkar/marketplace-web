"use client";
import { useSearchParams } from "next/navigation";
import ProductCatalog from "@/components/product/ProductCatalog";
import { ProductQuery } from "@/services/ProductService";
import ProductsFilter from "@/components/product/ProductsFilter";
import Link from "next/link";
import { CSSProperties } from "react";

function ProductsPage() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const maxPrice = searchParams.get("max-price");
  const basePath = "/products";

  const query: ProductQuery = {
    q: typeof q === "string" ? q : undefined,
    page: typeof page === "string" ? parseInt(page) : undefined,
    "max-price":
      typeof maxPrice === "string" ? parseFloat(maxPrice) : undefined,
    brand: searchParams.getAll("brand")
  };

  if (!query.q) {
    return null;
  }

  const breadcrumb = () => {
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
                {breadcrumb()}
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <ProductsFilter basePath={basePath} q={query.q} />
          </div>
          <div className="col-lg-8 col-xl-9">
            <ProductCatalog basePath={basePath} query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
