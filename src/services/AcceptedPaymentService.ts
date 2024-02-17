import makeApiRequest from "../common/makeApiRequest";
import { ShopAcceptedPayment } from "../common/models";
import { validateResponse } from "../common/utils";

export async function saveShopAcceptedPayment(values: ShopAcceptedPayment) {
  const url = `/vendor/shops/${values.shopId}/accepted-payments`;
  const resp = await makeApiRequest({
    url,
    options: {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function deleteShopAcceptedPayment(
  shopId: number,
  paymentId: number
) {
  const url = `/vendor/shops/${shopId}/accepted-payments/${paymentId}`;
  const resp = await makeApiRequest({
    url,
    options: {
      method: "DELETE"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function getShopAcceptedPayments(shopId: number) {
  const url = `/content/shops/${shopId}/accepted-payments`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<ShopAcceptedPayment[]>;
}
