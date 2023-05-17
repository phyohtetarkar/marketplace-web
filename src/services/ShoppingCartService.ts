import makeApiRequest from "../common/makeApiRequest";
import { AddToCartForm, CartItem } from "../common/models";
import { validateResponse } from "../common/utils";

const basePath = "cart-items";

export async function getCartItemsByUser() {
  const url = `profile/${basePath}`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<CartItem[]>;
}

export async function countCartItemsByUser() {
  const url = `profile/cart-count`;

  const resp = await makeApiRequest(url, {}, true);

  await validateResponse(resp);

  return resp.json() as Promise<number>;
}

export async function addToCart(value: AddToCartForm) {
  const url = basePath;

  const resp = await makeApiRequest(
    url,
    {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function updateQuantity(value: CartItem) {
  const url = basePath;

  const resp = await makeApiRequest(
    url,
    {
      method: "PUT",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}

export async function removeFromCart(items: [number]) {
  const url = basePath;

  const resp = await makeApiRequest(
    url,
    {
      method: "DELETE",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json"
      }
    },
    true
  );

  await validateResponse(resp);
}
