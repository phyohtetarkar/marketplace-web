import useSWR from "swr";
import { getPendingOrderCount } from "../../services/ShopService";

interface PendingOrderCountViewProps {
  shopId: number;
}

function PendingOrderCountView(props: PendingOrderCountViewProps) {
  const { shopId } = props;

  const { data, error, isLoading } = useSWR(
    `/shops/${shopId}/pending-order-count`,
    () => getPendingOrderCount(shopId),
    {
      revalidateOnFocus: false
    }
  );

  if (isLoading || !data) {
    return <></>;
  }

  if (data && parseInt(data) <= 0) {
    return <></>;
  }

  return (
    <small className="bg-danger rounded-pill px-2 text-light ms-2">
      {data}
    </small>
  );
}

export default PendingOrderCountView;
