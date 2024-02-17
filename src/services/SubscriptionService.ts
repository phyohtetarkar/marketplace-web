import makeApiRequest from "@/common/makeApiRequest";
import {
  PaymentTokenResult,
  ShopSubscription,
  SubscriptionPlan,
  SubscriptionPromo
} from "@/common/models";
import { validateResponse } from "@/common/utils";

export async function getAllSubscriptions() {
  const url = `/content/subscription-plans`;

  const resp = await makeApiRequest({ url });

  await validateResponse(resp);

  return resp.json() as Promise<SubscriptionPlan[]>;
}

export async function getActiveSubscriptions(shopId: number) {
  const url = `/vendor/shops/${shopId}/subscriptions`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as ShopSubscription[])
    .catch((e) => undefined);
}

export async function renewSubscription({
  shopId,
  subscriptionPlanId,
  promoCodeId
}: {
  shopId: number;
  subscriptionPlanId: number;
  promoCodeId?: number;
}) {
  const url = `/vendor/shops/${shopId}/renew-subscription`;

  const body = { subscriptionPlanId, promoCodeId };

  const resp = await makeApiRequest({
    url,
    options: {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as PaymentTokenResult)
    .catch((e) => undefined);
}

export async function getSubscriptionPromo(code: string) {
  const url = `/vendor/subscription-promos/${code}`;

  const resp = await makeApiRequest({url, authenticated: true});

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as SubscriptionPromo)
    .catch((e) => undefined);
}
