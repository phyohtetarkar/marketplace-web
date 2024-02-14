"use client";
import { withAuthentication } from "@/common/WithAuthentication";
import { SubscriptionPlan, SubscriptionPromo } from "@/common/models";
import { calcDiscount, formatNumber, parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import ProgressButton from "@/components/ProgressButton";
import { Input } from "@/components/forms";
import {
  getAllSubscriptions,
  getSubscriptionPromo,
  renewSubscription
} from "@/services/SubscriptionService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";

interface Props {
  shopId: number;
}

function RenewShopSubscription({ shopId }: Props) {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>();

  const [subscriptionPromo, setSubscriptionPromo] =
    useState<SubscriptionPromo>();

  const [promoCode, setPromoCode] = useState<string>();

  const [promoCodeError, setPromoCodeError] = useState<string>();

  const [showPriceSummary, setShowPriceSummary] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);

  const [loadingPromo, setLoadingPromo] = useState(false);

  const plansState = useSWR("/subscription-plans", getAllSubscriptions, {
    revalidateOnFocus: false
  });

  const getDiscountValue = () => {
    if (subscriptionPromo) {
      const promo = subscriptionPromo;
      return (
        (subscriptionPlan?.price ?? 0) -
        calcDiscount(promo.valueType!, promo.value!, subscriptionPlan?.price ?? 0)
      );
    }

    return 0;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const result = await renewSubscription({
        shopId: shopId,
        subscriptionPlanId: subscriptionPlan?.id ?? 0,
        promoCodeId: subscriptionPromo?.id
      });
      setShowPriceSummary(false);
      setTimeout(() => {
        setSubmitting(false);
        if (result) {
          window.location.href = result.webPaymentUrl;
        } else {
          toast.success("Subscription success");
          mutate(`/vendor/shops/${shopId}`)
          router.push(`/profile/shops/${shopId}/subscriptions`);
        }
      }, 500);
      
    } catch (error) {
      setSubmitting(false);
      setShowPriceSummary(false);
      toast.error(parseErrorResponse(error));
    }
  };

  if (plansState.isLoading) {
    return <Loading />;
  }

  if (plansState.error) {
    return (
      <Alert message={parseErrorResponse(plansState.error)} variant="danger" />
    );
  }

  if (!plansState.data || plansState.data.length === 0) {
    return <Alert message="No plan found" />;
  }

  return (
    <>
      <Alert
        message="Select one of the subscription plans and continue to subscribe."
      />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {plansState.data.map((sp, i) => {
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

      <Modal
        show={showPriceSummary}
        onHidden={() => {
          setLoadingPromo(false);
          setPromoCodeError(undefined);
          setPromoCode(undefined);
          setSubscriptionPromo(undefined);
          setSubscriptionPlan(undefined);
        }}
      >
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
                {subscriptionPlan?.promoUsable && (
                  <div
                    className={`input-group mb-3 ${
                      promoCodeError ? "has-validation" : ""
                    }`}
                  >
                    <Input
                      placeholder="Promo code"
                      height={44}
                      value={promoCode ?? ""}
                      disabled={!subscriptionPlan?.promoUsable}
                      className={`${promoCodeError ? "is-invalid" : ""} ${
                        !promoCodeError && subscriptionPromo ? "is-valid" : ""
                      }`}
                      onChange={(evt) => {
                        setPromoCode(evt.target.value);
                      }}
                    />
                    <ProgressButton
                      loading={loadingPromo}
                      variant="default"
                      disabled={!subscriptionPlan?.promoUsable}
                      onClick={async () => {
                        try {
                          setPromoCodeError(undefined);
                          setSubscriptionPromo(undefined);
                          if (!promoCode) {
                            throw "Please enter promo code";
                          }
                          setLoadingPromo(true);
                          const promo = await getSubscriptionPromo(promoCode);
                          if (!promo) {
                            throw "Invalid promo code";
                          }

                          if (promo.used) {
                            throw "Promo code already used";
                          }

                          if ((promo.expiredAt ?? 0) < new Date().getTime()) {
                            throw "Promo code expired";
                          }

                          if (
                            (promo.minConstraint ?? 0) >
                            (subscriptionPlan?.price ?? 0)
                          ) {
                            throw `Promo code must be used on ${
                              promo.minConstraint ?? 0
                            } and above`;
                          }

                          setSubscriptionPromo(promo);
                        } catch (error) {
                          const msg = parseErrorResponse(error);
                          setPromoCodeError(msg);
                        } finally {
                          setLoadingPromo(false);
                        }
                      }}
                    >
                      Apply
                    </ProgressButton>
                    {promoCodeError && (
                      <div className="invalid-feedback">{promoCodeError}</div>
                    )}
                  </div>
                )}

                <div className="hstack justify-content-between mb-2h">
                  <dt className="fw-semibold">Plan:</dt>
                  <dd className="text-muted mb-0">{subscriptionPlan?.title}</dd>
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
                  <dd className="text-danger mb-0">
                    -{formatNumber(getDiscountValue())} Ks
                  </dd>
                </div>

                <hr className="text-muted" />

                <div className="hstack justify-content-between mb-2h">
                  <dt className="fw-semibold" style={{ fontSize: "1.2rem" }}>
                    Total Price:
                  </dt>
                  <dd className="mb-0" style={{ fontSize: "1.2rem" }}>
                    {formatNumber(
                      (subscriptionPlan?.price ?? 0) - getDiscountValue()
                    )}
                    &nbsp;Ks
                  </dd>
                </div>
              </div>
              <div className="modal-footer">
                <ProgressButton
                  className="py-2 px-3"
                  disabled={loadingPromo}
                  loading={isSubmitting}
                  onClick={handleSubmit}
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
}

export default withAuthentication(RenewShopSubscription);
