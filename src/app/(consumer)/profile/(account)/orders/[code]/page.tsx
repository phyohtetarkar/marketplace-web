import OrderPage from "./order-page";

interface Props {
    params: { code: string };
  }

export default function Order({ params }: Props) {
    return <OrderPage code={params.code} />
}