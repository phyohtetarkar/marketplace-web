import { useRouter } from "next/router";
import { useEffect } from "react";
import ProductCatalog from "../../components/product/ProductCatalog";
import { ProductQuery } from "../../services/ProductService";

function Products() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { q } = router.query;

    if (!q) {
      router.replace("/");
    }
  }, [router]);

  if (!router.isReady) {
    return;
  }

  const { q, page, brand } = router.query;

  const query: ProductQuery = {
    q: typeof q === "string" ? q : undefined,
    page: typeof page === "string" ? parseInt(page) : undefined,
    brand: brand
  };

  if (!query.q) {
    return null;
  }

  return <ProductCatalog basePath="/products" query={query} />;
}

export default Products;
