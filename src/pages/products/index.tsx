import { useRouter } from "next/router";
import ProductCatalog from "../../components/product/ProductCatalog";
import { ProductQuery } from "../../services/ProductService";

function Products() {
  const router = useRouter();
  if (!router.isReady) {
    return;
  }

  const { q, page, brand } = router.query;

  const query: ProductQuery = {
    q: typeof q === "string" ? q : undefined,
    page: typeof page === "string" ? parseInt(page) : undefined,
    brand: brand
  };

  return <ProductCatalog basePath="/products" query={query} />;
}

export default Products;
