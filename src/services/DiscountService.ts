import makeApiRequest from "../common/makeApiRequest";
import { Discount } from "../common/models";
import { validateResponse } from "../common/utils";

export async function saveDiscount(shopId: number, value: Discount) {
  const url = `/vendor/shops/${shopId}/discounts`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: !value.id ? "POST" : "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function deleteDiscount(shopId: number, id: number) {
  const url = `/vendor/shops/${shopId}/discounts/${id}`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "DELETE"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function applyDiscount(
  shopId: number,
  discountId: number,
  productIds: [number]
) {
  const url = `/vendor/shops/${shopId}/discounts/${discountId}/apply`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "POST",
      body: JSON.stringify(productIds),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function removeDiscount(shopId: number, productId: number) {
  const url = `/vendor/shops/${shopId}/products/${productId}/remove-discount`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT"
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function findDiscounts(shopId: number) {
  const url = `/vendor/shops/${shopId}/discounts`;
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<Discount[]>;
}
