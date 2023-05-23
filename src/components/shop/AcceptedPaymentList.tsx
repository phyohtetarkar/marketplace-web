import useSWR from "swr";
import { parseErrorResponse } from "../../common/utils";
import { getShopAcceptedPayments } from "../../services/AcceptedPaymentService";
import Alert from "../Alert";
import Loading from "../Loading";

function AcceptedPaymentList({ shopId }: { shopId: number }) {
  const { data, error, isLoading } = useSWR(
    `/shops/${shopId}/accepted-payments`,
    () => getShopAcceptedPayments(shopId),
    {
      revalidateOnFocus: false
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    const msg = parseErrorResponse(error);
    return <Alert message={msg} variant="danger" />;
  }

  if (!data || data.length === 0) {
    return <Alert message={"No data found"} />;
  }

  return (
    <div className="vstack gap-2">
      {data.map((p, i) => {
        return (
          <div key={i} className="vstack p-2h rounded bg-light">
            <h6 className="fw-semibold">{p.accountType}</h6>
            <div>{p.accountName}</div>
            <div className="text-muted">{p.accountNumber}</div>
          </div>
        );
      })}
    </div>
  );
}

export default AcceptedPaymentList;
