import ProductsPage from "./products-page";

export default function ShopProducts({
  params
}: {
  params: { shopId: string };
}) {
  return <ProductsPage shopId={parseInt(params.shopId)} />;
}
