import makeApiRequest from "@/common/makeApiRequest";
import {
  ShopSubscription,
  ShopSubscriptionStatus,
  ShopSubscriptionTransaction
} from "@/common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import dayjs from "dayjs";
import useSWR from "swr";

const getSubscriptionTransaction = async (invoiceNo: number) => {
  const url = `/admin/shop-subscriptions/${invoiceNo}/transaction`;
  const resp = await makeApiRequest({ url, authenticated: true });

  return resp
    .json()
    .then((json) => json as ShopSubscriptionTransaction)
    .catch((e) => undefined);
};

export default function SubscriptionTransactionDetail({
  subscription
}: {
  subscription: ShopSubscription;
}) {
  const { data, error, isLoading } = useSWR(
    `/admin/shop-subscriptions/${subscription.invoiceNo}/transaction`,
    () => getSubscriptionTransaction(subscription.invoiceNo),
    {
      revalidateOnFocus: false
    }
  );

  const statusView = (status?: ShopSubscriptionStatus) => {
    if (status === "SUCCESS") {
      return <small className="text-success fw-semibold">{status}</small>;
    }

    if (status === "PENDING") {
      return <small className="text-warning fw-semibold">{status}</small>;
    }

    if (status === "FAILED") {
      return <small className="text-danger fw-semibold">{status}</small>;
    }

    return <></>;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  return (
    <div className="modal-body">
      <div className="row gy-2 gx-3">
        <div className="col-sm-6">
          <dl className="row mb-0">
            <dt className="col-12">Subscribe by</dt>
            <dd className="col-12">{subscription?.shop?.name}</dd>

            <dt className="col-12">Subscription plan</dt>
            <dd className="col-12">{subscription?.title}</dd>

            <dt className="col-12">Duration</dt>
            <dd className="col-12">{subscription?.duration}</dd>

            <dt className="col-12">Promo code</dt>
            <dd className="col-12">{subscription?.promoCode}</dd>

            <dt className="col-12">Subtotal price</dt>
            <dd className="col-12">
              {formatNumber(subscription?.subTotalPrice ?? 0)}
            </dd>

            <dt className="col-12">Discount</dt>
            <dd className="col-12 text-danger">
              -{formatNumber(subscription?.discount ?? 0)}
            </dd>

            <dt className="col-12">Total price</dt>
            <dd className="col-12 mb-0">
              {formatNumber(subscription?.totalPrice ?? 0)}
            </dd>
          </dl>
        </div>
        <div className="col-sm-6">
          <dl className="row mb-0">
            <dt className="col-12">Status</dt>
            <dd className="col-12">{statusView(subscription?.status)}</dd>

            <dt className="col-12">Invoice no</dt>
            <dd className="col-12">{subscription.invoiceNo}</dd>

            <dt className="col-12">Trans ref</dt>
            <dd className="col-12">{data?.tranRef}</dd>

            <dt className="col-12">Reference no</dt>
            <dd className="col-12">{data?.referenceNo}</dd>

            <dt className="col-12">Agent code</dt>
            <dd className="col-12">{data?.agentCode}</dd>

            <dt className="col-12">Channel code</dt>
            <dd className="col-12">{data?.channelCode}</dd>

            <dt className="col-12">Issued at</dt>
            <dd className="col-12">
              {data?.transactionDateTime
                ? dayjs(data.transactionDateTime, "YYYYMMDDHHmmss").format(
                    "MMM DD, YYYY hh:mm A"
                  )
                : formatTimestamp(subscription?.audit?.createdAt, true)}
            </dd>

            <dt className="col-12">Resp code</dt>
            <dd className="col-12">{data?.respCode}</dd>

            <dt className="col-12">Resp desc</dt>
            <dd className="col-12 mb-0">{data?.respDesc}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
