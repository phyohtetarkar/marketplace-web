import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Shop, SubscriptionPlan } from "../../../../common/models";
import { formatNumber, parseErrorResponse } from "../../../../common/utils";
import Alert from "../../../../components/Alert";
import { Input } from "../../../../components/forms";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import ProgressButton from "../../../../components/ProgressButton";
import { ShopManage } from "../../../../components/shop";
import {
  getAllSubscriptions,
  renewSubscription
} from "../../../../services/SubscriptionService";

function RenewSubscription() {
  const router = useRouter();

  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>();

  const [showPriceSummary, setShowPriceSummary] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);

  const { data, isLoading, error } = useSWR(
    "/subscription-plans",
    getAllSubscriptions,
    {
      revalidateOnFocus: false
    }
  );

  const handleSubmit = async (shop: Shop) => {
    try {
      setSubmitting(true);
      const result = await renewSubscription({
        shopId: shop.id ?? 0,
        subscriptionPlanId: subscriptionPlan?.id ?? 0
      });
      if (result) {
        window.location.href = result.webPaymentUrl;
      } else {
        router.push(`/account/shops/${shop.slug}/subscriptions`);
      }
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      setSubmitting(false);
      setShowPriceSummary(false);
    }
  };

  const content = (shop: Shop) => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data || data.length === 0) {
      return <Alert message="No plan found" />;
    }

    return (
      <>
        <div className="header-bar">
          <div className="container py-4">
            <div className="row g-3">
              <div className="col-lg-6">
                <h4 className="mb-1 fw-semibold text-light">{shop.name}</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link href={`/account/shops/${shop.slug}/dashboard`}>
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href={`/account/shops/${shop.slug}/subscriptions`}>
                        Subscriptions
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Renew Subscription
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-lg-6 d-flex"></div>
            </div>
          </div>
        </div>

        <div className="container py-3 mb-5">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxxl-4 g-3">
            {data.map((sp, i) => {
              return (
                <div key={sp.id} className="col">
                  <div className="card h-100">
                    <div className="card-header py-2h">
                      <h5 className="text-center mb-0">{sp.title}</h5>
                    </div>
                    <div className="card-body text-center">
                      <h2 className="mb-3 card-title mt-2">
                        {formatNumber(sp.price)} Ks
                      </h2>

                      <div className="text-muted mb-4">
                        Duration: {sp.duration} days
                      </div>

                      <button
                        className="btn btn-primary w-100"
                        onClick={() => {
                          setSubscriptionPlan(sp);
                          setShowPriceSummary(true);
                        }}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Modal show={showPriceSummary}>
          {(isShown) => {
            if (!isShown) {
              return <></>;
            }

            return (
              <>
                <div className="modal-header">
                  <h4 className="modal-title">Confirm subscription</h4>
                  <button
                    type="button"
                    className="btn-close shadow-none"
                    aria-label="Close"
                    disabled={isSubmitting}
                    onClick={() => setShowPriceSummary(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className={`input-group mb-3`}>
                    <Input placeholder="Promo code" height={44} />
                    <ProgressButton className="" theme="outline">
                      Apply
                    </ProgressButton>
                  </div>

                  <div className="hstack justify-content-between mb-2h">
                    <dt className="fw-semibold">Plan:</dt>
                    <dd className="text-muted mb-0">
                      {subscriptionPlan?.title}
                    </dd>
                  </div>

                  <div className="hstack justify-content-between mb-2h">
                    <dt className="fw-semibold">Duration:</dt>
                    <dd className="text-muted mb-0">
                      {subscriptionPlan?.duration} days
                    </dd>
                  </div>

                  <div className="hstack justify-content-between mb-2h">
                    <dt className="fw-semibold">Subtotal:</dt>
                    <dd className="text-muted mb-0">
                      {formatNumber(subscriptionPlan?.price ?? 0)} Ks
                    </dd>
                  </div>

                  <div className="hstack justify-content-between">
                    <dt className="fw-semibold">Discount:</dt>
                    <dd className="text-danger mb-0">-{formatNumber(0)} Ks</dd>
                  </div>

                  <hr className="text-muted" />

                  <div className="hstack justify-content-between mb-2h">
                    <dt className="fw-semibold" style={{ fontSize: "1.2rem" }}>
                      Total Price:
                    </dt>
                    <dd className="mb-0" style={{ fontSize: "1.2rem" }}>
                      {formatNumber(subscriptionPlan?.price ?? 0)} Ks
                    </dd>
                  </div>
                </div>
                <div className="modal-footer">
                  <ProgressButton
                    className="py-2 px-3"
                    loading={isSubmitting}
                    onClick={() => handleSubmit(shop)}
                  >
                    Make payment
                  </ProgressButton>
                </div>
              </>
            );
          }}
        </Modal>
      </>
    );
  };

  return (
    <>
      <ShopManage activeTab="renew-subscription" customBody>
        {(shop) => content(shop)}
      </ShopManage>
    </>
  );
}

export default RenewSubscription;
