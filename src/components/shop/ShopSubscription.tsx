import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Shop, ShopSubscription } from "../../common/models";
import { formatTimestamp, parseErrorResponse } from "../../common/utils";
import {
  getCurrentSubscription,
  getPreSubscriptions
} from "../../services/SubscriptionService";
import Alert from "../Alert";
import Loading from "../Loading";

interface ShopSubscriptionProps {
  shop: Shop;
}

function ShopSubscription(props: ShopSubscriptionProps) {
  const { shop } = props;

  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState<ShopSubscription[]>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    loadSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSubscriptions = async () => {
    try {
      setError(undefined);
      setLoading(true);
      const current = await getCurrentSubscription(shop.id ?? 0);
      const list = await getPreSubscriptions(shop.id ?? 0);
      const ss: ShopSubscription[] = [];
      if (list) {
        ss.push(...list);
      }

      if (current) {
        ss.push(current);
      }
      setSubscriptions(ss);
    } catch (error) {
      setError(parseErrorResponse(error));
    } finally {
      setLoading(false);
    }
  };

  const getStatusView = (s: ShopSubscription) => {
    const currentTime = new Date().getTime();
    if (currentTime >= s.startAt && currentTime <= s.endAt) {
      return (
        <div className="px-2 py-1 rounded-pill bg-success text-light">
          ACTIVE
        </div>
      );
    }

    return <div className="px-2 py-1 rounded-pill bg-default">PENDING</div>;
  };

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={error} variant="danger" />;
    }

    if (!subscriptions || subscriptions.length === 0) {
      return <Alert message="No subscriptions found" />;
    }

    return (
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="text-nowrap">
            <tr>
              <th scope="col" style={{ minWidth: 250 }}>
                Subscription Plan
              </th>
              <th scope="col" style={{ minWidth: 100 }}>
                Duration
              </th>
              <th scope="col" style={{ minWidth: 150 }}>
                Start/End
              </th>
              <th scope="col" style={{ minWidth: 120 }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {subscriptions.map((s, i) => {
              return (
                <tr key={i}>
                  <td scope="row" className="py-2h">
                    {s.title}
                  </td>
                  <td>{s.duration} days</td>
                  <td>
                    {formatTimestamp(s.startAt)}-{formatTimestamp(s.endAt)}
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
            href={`/account/shops/${shop.slug}/renew-subscription`}
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

export default ShopSubscription;
