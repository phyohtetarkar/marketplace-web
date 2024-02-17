import { usePendingOrderCount } from "@/common/hooks";

function PendingOrderCountView({ shopId }: { shopId: number }) {
  const { count, error, isLoading } = usePendingOrderCount(shopId);

  if (isLoading || error) {
    return <></>;
  }

  if (count && parseInt(count) <= 0) {
    return <></>;
  }

  return (
    <small className="bg-danger rounded-pill px-2 text-light ms-2">
      {count}
    </small>
  );
}

export default PendingOrderCountView;
