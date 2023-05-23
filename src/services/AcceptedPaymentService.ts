import makeApiRequest from "../common/makeApiRequest";
import { ShopAcceptedPayment } from "../common/models";
import { validateResponse } from "../common/utils";

export async function saveShopAcceptedPayment(value: ShopAcceptedPayment) {
  const url = `accepted-payments`;
  const resp = await makeApiRequest(
    url,
    {
      method: !value.id ? "POST" : "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function deleteShopAcceptedPayment(paymentId: number) {
  const url = `accepted-payments/${paymentId}`;
  const resp = await makeApiRequest(
    url,
    {
      method: "DELETE"
    },
    true
  );

  await validateResponse(resp);
}

export async function getShopAcceptedPayments(shopId: number) {
  const url = `accepted-payments?shop-id=${shopId}`;

  const resp = await makeApiRequest(url);

  await validateResponse(resp);

  return resp.json() as Promise<ShopAcceptedPayment[]>;
}
