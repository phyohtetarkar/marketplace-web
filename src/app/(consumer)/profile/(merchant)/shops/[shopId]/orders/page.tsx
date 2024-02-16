import OrdersPage from "./orders-page";

export default function ShopOrders({ params }: { params: { shopId: string } }) {
  return <OrdersPage shopId={parseInt(params.shopId)} />;
}
