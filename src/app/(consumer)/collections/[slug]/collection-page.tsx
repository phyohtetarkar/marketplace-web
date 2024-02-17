"use client";
import { useLocalization } from "@/common/hooks";
import { Category } from "@/common/models";
import { getCategoryName } from "@/common/utils";
import ProductCatalog from "@/components/product/ProductCatalog";
import ProductsFilter from "@/components/product/ProductsFilter";
import { ProductQuery } from "@/services/ProductService";
import Link from "next/link";
import { CSSProperties } from "react";

interface Props {
  category: Category;
  searchParams: { [key: string]: string | string[] | undefined };
}

function CollectionPage({ category, searchParams }: Props) {
  const { page, brand } = searchParams;
  const { locale } = useLocalization();

  const maxPrice = searchParams["max-price"];
  const basePath = `/collections/${category.slug}`;

  const query: ProductQuery = {
    page: typeof page === "string" ? parseInt(page) : undefined,
    "category-id": category?.id,
    brand: brand,
    "max-price": typeof maxPrice === "string" ? parseFloat(maxPrice) : undefined
  };

  const breadcrumb = () => {
    const element: JSX.Element[] = [];

    element.push(
      <li
        key={category.id}
        className="breadcrumb-item active"
        aria-current="page"
      >
        {getCategoryName(locale, category)}
      </li>
    );

    for (let c = category?.category; !!c; c = c?.category) {
      const e = (
        <li key={c.id} className="breadcrumb-item">
          <Link href={`/collections/${c.slug}`} className="">
            {getCategoryName(locale, c)}
          </Link>
        </li>
      );
      element.push(e);
    }

    return element.reverse();
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
            <ProductsFilter basePath={basePath} categoryId={category.id} />
          </div>
          <div className="col-lg-8 col-xl-9">
            <ProductCatalog basePath={basePath} query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
