import { CartItem, CartItemId } from "../common/models";
import { getAPIBasePath, getAuthHeader } from "../common/utils";

const basePath = "cart-items";

export async function getCartItemsByUser() {
  const url = getAPIBasePath() + basePath;
  return fetch(url, {
    headers: {
      Authorization: await getAuthHeader()
    }
  }).then((res) => res.json() as Promise<CartItem[]>);
}

export async function addToCart(value: CartItem) {
  const url = getAPIBasePath() + basePath;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });
}

export async function updateQuantity(value: CartItem) {
  const url = getAPIBasePath() + basePath;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader()
    }
  });
}

export async function removeFromCart(ids: [CartItemId]) {
  const url = getAPIBasePath() + basePath;
  await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(ids),
    headers: {
      Authorization: await getAuthHeader()
    }
  });
}
