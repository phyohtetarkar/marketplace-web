import makeApiRequest from "../common/makeApiRequest";
import {
  PaymentTokenResult,
  ShopSubscription,
  SubscriptionPlan,
  SubscriptionPromo
} from "../common/models";
import { validateResponse } from "../common/utils";

export async function getAllSubscriptions() {
  const url = `subscription-plans`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<SubscriptionPlan[]>;
}

export async function getSubscription(invoiceNo: string) {
  const url = `payment/${invoiceNo}`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as ShopSubscription)
    .catch((e) => null);
}

export async function getCurrentSubscription(shopId: number) {
  const url = `shop-subscriptions/${shopId}/current-subscription`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as ShopSubscription)
    .catch((e) => undefined);
}

export async function getPreSubscriptions(shopId: number) {
  const url = `shop-subscriptions/${shopId}/pre-subscriptions`;

  const resp = await makeApiRequest(url, {}, true);

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
  const url = `shop-subscriptions/${shopId}/renew-subscription`;

  const body = { subscriptionPlanId, promoCodeId };

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as PaymentTokenResult)
    .catch((e) => undefined);
}

export async function getSubscriptionPromo(code: string) {
  const url = `subscription-promos/${code}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp
    .json()
    .then((json) => json as SubscriptionPromo)
    .catch((e) => undefined);
}
