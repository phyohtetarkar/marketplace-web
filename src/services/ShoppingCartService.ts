import makeApiRequest from "../common/makeApiRequest";
import { CartItem, CartItemForm, CartItemID } from "../common/models";
import { validateResponse } from "../common/utils";

export async function getCartItemsByUser() {
  const url = `/profile/cart-items`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<CartItem[]>;
}

export async function countCartItemsByUser() {
  const url = `/profile/cart-count`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<number>;
}

export async function addToCart(values: CartItemForm) {
  const url = "/cart-items";

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

export async function updateQuantity(values: CartItemForm) {
  const url = "/cart-items";

  const resp = await makeApiRequest({
    url,
    options: {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}

export async function removeFromCart(items: [CartItemID]) {
  const url = "/cart-items";

  const resp = await makeApiRequest({
    url,
    options: {
      method: "DELETE",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json"
      }
    },
    authenticated: true
  });

  await validateResponse(resp);
}
