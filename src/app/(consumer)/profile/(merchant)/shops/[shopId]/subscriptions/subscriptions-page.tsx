"use client";
import { ShopSubscription } from "@/common/models";
import { formatTimestamp } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import { getActiveSubscriptions } from "@/services/SubscriptionService";
import { RiArrowLeftRightLine } from "@remixicon/react";
import Link from "next/link";
import useSWR from "swr";

interface ShopSubscriptionProps {
  shopId: number;
}

function SubscriptionsPage(props: ShopSubscriptionProps) {
  const { shopId } = props;

  const { data, error, isLoading } = useSWR(
    `/vendor/shops/${shopId}/subscriptions`,
    () => getActiveSubscriptions(shopId),
    {
      revalidateOnFocus: false
    }
  );

  const getStatusView = (s: ShopSubscription) => {
    const currentTime = new Date().getTime();
    if (currentTime >= s.startAt && currentTime <= s.endAt) {
      return (
        <div className="px-2 py-1 rounded-pill bg-success small text-light">
          ACTIVE
        </div>
      );
    }

    return (
      <div className="px-2 py-1 rounded-pill small bg-default">WAITING</div>
    );
  };

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={error} variant="danger" />;
    }

    if (!data || data.length === 0) {
      return <Alert message="No subscriptions found" />;
    }

    return (
      <div className="table-responsive bg-white rounded border">
        <table className="table mb-0" >
          <thead className="text-nowrap align-middle">
            <tr>
              <th scope="col" style={{ minWidth: 200 }}>
                SUBSCRIPTION PLAN
              </th>
              <th scope="col" style={{ minWidth: 100 }}>
                DURATION
              </th>
              <th scope="col" style={{ minWidth: 200 }}>
                START / END
              </th>
              <th scope="col" style={{ minWidth: 120 }}>
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="text-nowrap align-middle">
            {data.map((s, i) => {
              return (
                <tr key={i}>
                  <th scope="row" className="py-3">
                    {s.title}
                  </th>
                  <td>{s.duration} days</td>
                  <td>
                    <div className="hstack">
                      {formatTimestamp(s.startAt)}
                      {/* <span className="fw-semibold mx-1">{"<=>"}</span> */}
                      <RiArrowLeftRightLine size={20} className="mx-1" />
                      {formatTimestamp(s.endAt)}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">{getStatusView(s)}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col"></div>
        <div className="col-auto">
          <Link
            href={`/profile/shops/${shopId}/renew-subscription`}
            className="btn btn-primary px-3 py-2"
          >
            Renew subscription
          </Link>
        </div>
      </div>
      {content()}
    </>
  );
}

export default SubscriptionsPage;
